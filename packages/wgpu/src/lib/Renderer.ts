import Gpu from './Gpu';
import Surface from './Surface';
import TextureLoader from './TextureLoader';

export type EngineProps = {
  label?: string;
};

export class Engine {
  public readonly gpu: Gpu;
  public readonly texLoader: TextureLoader;
  public readonly surfaces: Map<string, Surface>

  constructor({ label, canvas }: EngineProps) {
    this.gpu = new Gpu(`${label}/gpu`);
    this.texLoader = new TextureLoader();
    this.surfaces = new Map<string, Surface>()
  }

  async init(): Promise<this> {
    await this.gpu.init();
    await this.texLoader.init(this.gpu);

    return this;
  }

  async addCanvas(id: string, canvas: HTMLCanvasElement) {

  }
}

export default Engine;
