import {
  TicTacToeAIWorkerMsg,
  TicTacToeAIWorkerResponse,
} from '@/app/lib/definitions';
export class TicTacToeAIWorkerController {
  worker: Worker;
  action: TicTacToeAIWorkerMsg;
  constructor({ action }: { action: TicTacToeAIWorkerMsg }) {
    this.worker = new Worker(
      new URL('@/app/workers/tic-tac-toe/worker', import.meta.url),
    );
    this.action = action;
  }
  postMessage(): Promise<TicTacToeAIWorkerResponse> {
    return new Promise<TicTacToeAIWorkerResponse>((resolve, reject) => {
      this.worker.onmessage = (event) => {
        resolve(event.data);
        this.terminate();
      };
      this.worker.onerror = (error) => {
        reject(error);
        this.terminate();
      };
      this.worker.postMessage(this.action);
    });
  }
  terminate(): void {
    this.worker.terminate();
  }
}