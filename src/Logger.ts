import Chalk from "chalk";

export async function Logger(path: string, method: string, status: number = 200, start: number) {
  const statusCode = (status: number) => {
    if (status >= 200 && status < 300) {
      return Chalk.green(status);
    }
    if (status >= 300 && status < 400) {
      return Chalk.yellow(status);
    }
    if (status >= 400 && status < 500) {
      return Chalk.red(status);
    }
    if (status >= 500) {
      return Chalk.red(status);
    }
  };

  const totalTime = Date.now() - start;

  console.log(`${Chalk.bold(method)} ${path} - ${statusCode(status)} - ${totalTime}ms`);
}
