import { TicTacToe } from '@/app/lib/definitions';
export class TicTacToeAIWorkerController {
  worker: Worker;
  action: TicTacToe.AIWorkerMsg;
  constructor({ action }: { action: TicTacToe.AIWorkerMsg }) {
    this.worker = new Worker(
      new URL('@/app/workers/tic-tac-toe/worker', import.meta.url),
    );
    this.action = action;
  }
  postMessage(): Promise<TicTacToe.AIWorkerResponse> {
    return new Promise<TicTacToe.AIWorkerResponse>((resolve, reject) => {
      this.worker.onmessage = (event) => {
        resolve(event.data);
        this.terminate();
      };
      this.worker.onerror = (error) => {
        reject(error);
        this.terminate();
      };
      this.worker.postMessage(this.action);
      setTimeout(() => {
        reject('tic-tac-toe ai worker timeout');
        this.terminate();
      }, TicTacToe.CONFIG.aiTimeout);
    });
  }
  terminate(): void {
    this.worker.terminate();
  }
}
