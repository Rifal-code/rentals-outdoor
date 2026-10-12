export interface RainOptions {
  intensity: number; // 0 - 100% (mengatur jumlah partikel)
  speed: number;     // 0 - 100% (mengatur kecepatan jatuh)
  size: number;      // 0 - 100% (mengatur panjang garis tetesan)
}

export interface RainDrop {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
}

export interface SplashDrop {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  radius: number;
}

/**
 * Engine simulasi partikel hujan 2D ringan untuk Hero canvas.
 * Anggaran CPU ≤ 2 ms per frame.
 */
export class RainSimulation {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private drops: RainDrop[] = [];
  private splashes: SplashDrop[] = [];
  private isRunning: boolean = false;
  private animFrameId: number | null = null;
  private isMobile: boolean = false;

  public options: RainOptions = {
    intensity: 35,
    speed: 80,
    size: 24,
  };

  constructor(canvas: HTMLCanvasElement, initialOptions?: Partial<RainOptions>) {
    this.canvas = canvas;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Canvas 2D context tidak tersedia.');
    this.ctx = context;

    if (initialOptions) {
      this.options = { ...this.options, ...initialOptions };
    }

    this.checkViewport();
    this.initDrops();
  }

  private checkViewport(): void {
    this.isMobile = window.innerWidth < 768;
  }

  public resize(): void {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = this.canvas.getBoundingClientRect();

    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.ctx.scale(dpr, dpr);

    this.checkViewport();
    this.initDrops();
  }

  private getMaxDrops(): number {
    // PRD: maks 220 partikel desktop, 80 mobile
    const limit = this.isMobile ? 80 : 220;
    return Math.floor((this.options.intensity / 100) * limit);
  }

  private initDrops(): void {
    const rect = this.canvas.getBoundingClientRect();
    const count = this.getMaxDrops();
    this.drops = [];

    for (let i = 0; i < count; i++) {
      this.drops.push({
        x: Math.random() * (rect.width + 100) - 50,
        y: Math.random() * rect.height,
        length: 10 + (this.options.size / 100) * 30 * (0.8 + Math.random() * 0.4),
        speed: 8 + (this.options.speed / 100) * 16 * (0.8 + Math.random() * 0.4),
        opacity: 0.15 + Math.random() * 0.25,
      });
    }
  }

  public updateOptions(newOptions: Partial<RainOptions>): void {
    this.options = { ...this.options, ...newOptions };
    const targetCount = this.getMaxDrops();
    const rect = this.canvas.getBoundingClientRect();

    while (this.drops.length < targetCount) {
      this.drops.push({
        x: Math.random() * (rect.width + 100) - 50,
        y: Math.random() * -rect.height,
        length: 10 + (this.options.size / 100) * 30,
        speed: 8 + (this.options.speed / 100) * 16,
        opacity: 0.15 + Math.random() * 0.25,
      });
    }

    if (this.drops.length > targetCount) {
      this.drops.length = targetCount;
    }
  }

  public start(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    this.loop();
  }

  public stop(): void {
    this.isRunning = false;
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
  }

  private loop = (): void => {
    if (!this.isRunning) return;

    this.render();
    this.animFrameId = requestAnimationFrame(this.loop);
  };

  private render(): void {
    const rect = this.canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    this.ctx.clearRect(0, 0, width, height);

    // Sudut miring hujan diagonal ±20 derajat (tan(20°) ≈ 0.36)
    const slantX = 0.36;

    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = '#FFFFFF';

    // Gambar partikel tetesan
    for (let i = 0; i < this.drops.length; i++) {
      const drop = this.drops[i];

      // Update posisi
      drop.y += drop.speed;
      drop.x -= drop.speed * slantX;

      // Reset jika melewati batas layar
      if (drop.y > height) {
        drop.y = -drop.length;
        drop.x = Math.random() * (width + 100) - 20;

        // Tetes air mengenai subjek jaket di area tengah
        const isNearSubject = drop.x > width * 0.3 && drop.x < width * 0.7;
        if (isNearSubject && Math.random() < 0.25 && this.splashes.length < 25) {
          this.splashes.push({
            x: drop.x,
            y: height * 0.45 + (Math.random() * height * 0.3),
            vx: (Math.random() - 0.5) * 1.5,
            vy: Math.random() * 0.5 + 0.3, // meluncur pelan ke bawah
            alpha: 0.7,
            radius: 1.2 + Math.random() * 1.5,
          });
        }
      }

      this.ctx.globalAlpha = drop.opacity;
      this.ctx.beginPath();
      this.ctx.moveTo(drop.x, drop.y);
      this.ctx.lineTo(drop.x - drop.length * slantX, drop.y + drop.length);
      this.ctx.stroke();
    }

    // Render tetesan yang menempel / meluncur pelan di jaket
    for (let i = this.splashes.length - 1; i >= 0; i--) {
      const s = this.splashes[i];
      s.x += s.vx;
      s.y += s.vy;
      s.alpha -= 0.008;

      if (s.alpha <= 0) {
        this.splashes.splice(i, 1);
        continue;
      }

      this.ctx.globalAlpha = s.alpha * 0.8;
      this.ctx.fillStyle = '#FFFFFF';
      this.ctx.beginPath();
      this.ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      this.ctx.fill();
    }

    this.ctx.globalAlpha = 1.0;
  }

  public destroy(): void {
    this.stop();
    this.drops = [];
    this.splashes = [];
  }
}
