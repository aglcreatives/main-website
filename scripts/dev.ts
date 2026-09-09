import { spawn, type ChildProcess } from 'node:child_process';
import net from 'node:net';

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const processes: ChildProcess[] = [];

const findAvailablePort = (start: number) => new Promise<number>((resolve, reject) => {
  const tryPort = (port: number) => {
    const server = net.createServer();
    server.unref();
    server.once('error', (error: NodeJS.ErrnoException) => {
      if (error.code === 'EADDRINUSE') return tryPort(port + 1);
      reject(error);
    });
    server.listen(port, () => {
      const address = server.address();
      server.close(() => resolve(typeof address === 'object' && address ? address.port : port));
    });
  };
  tryPort(start);
});

const start = (args: string[], env: NodeJS.ProcessEnv) => {
  const child = spawn(npmCommand, args, { stdio: 'inherit', env });
  processes.push(child);
  return child;
};

const stopAll = () => {
  for (const child of processes) child.kill('SIGTERM');
};

process.on('SIGINT', stopAll);
process.on('SIGTERM', stopAll);

const main = async () => {
  const webPort = await findAvailablePort(Number(process.env.WEB_PORT || 3000));
  const apiPort = await findAvailablePort(Math.max(Number(process.env.API_PORT || 3001), webPort + 1));
  const env = { ...process.env, PORT: String(apiPort), API_PORT: String(apiPort) };

  console.log(`Starting web on http://localhost:${webPort} with API on http://localhost:${apiPort}`);

  const api = start(['run', 'server'], env);
  const web = start(['run', 'dev:web', '--', '--port', String(webPort), '--strictPort'], env);

  api.on('exit', (code) => {
    if (code && code !== 0) process.exitCode = code;
    stopAll();
  });

  web.on('exit', (code) => {
    if (code && code !== 0) process.exitCode = code;
    stopAll();
  });
};

main().catch((error) => {
  console.error('Could not select development ports:', error);
  process.exitCode = 1;
});
