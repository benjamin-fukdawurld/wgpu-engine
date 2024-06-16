/**
 * Class representing the WebGPU device
 *
 * It contains both the navigator's GPU adapter and the GPU device.
 */
export class Gpu {
  public readonly label: string;
  private _adapter: GPUAdapter | null;
  private _device: GPUDevice | null;

  /**
   * Create the data structure and initializes the fields with null.
   * @param label The label to apply to the device and the GPU item created
   * from it.
   */
  public constructor(label = 'untitled') {
    this.label = label;
    this._adapter = null;
    this._device = null;
  }

  /**
   * Check whether or not the Gpu is initialized (ie: adapter and device have
   * been requested).
   * @date 09/09/2023 - 16:14:30
   *
   * @readonly
   * @type {boolean}
   */
  public get ready(): boolean {
    return !!this._adapter && !!this._device;
  }

  /**
   * Get the GPU adapter. If the Gpu has not been initialized it throws an error.
   * @date 09/09/2023 - 16:15:20
   *
   * @readonly
   * @type {GPUAdapter}
   */
  public get adapter(): GPUAdapter {
    if (!this._adapter) {
      throw new Error('Rendering device is not initialized');
    }

    return this._adapter;
  }

  /**
   * Get the GPU device. If the Gpu has not been initialized it throws an error.
   * @date 09/09/2023 - 16:16:05
   *
   * @readonly
   * @type {GPUDevice}
   */
  public get device(): GPUDevice {
    if (!this._device) {
      throw new Error('Rendering device is not initialized');
    }

    return this._device;
  }

  /**
   * Initialize the Gpu asynchronously. If the browser does not support WebGPU
   * or if the GPU adapter or device cannot be acquired the function throws an
   * error.
   */
  public async init(): Promise<void> {
    this._adapter = (await navigator.gpu?.requestAdapter()) ?? null;

    if (!this._adapter) {
      throw new Error('browser does not support WebGPU');
    }

    this._device =
      (await this._adapter?.requestDevice({
        label: `${this.label} device`,
      })) ?? null;

    if (!this._device) {
      throw new Error('browser does not support WebGPU');
    }
  }
}

export default Gpu;
