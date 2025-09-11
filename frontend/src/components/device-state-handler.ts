// frontend/src/components/DeviceStateHandler.ts

export class DeviceStateHandler {
  static newTemplate(): any {
    return {
      tagNumber: '',
      location: '',
      sensor: {
        ph: 0,
        ec: 0,
      },
      // Tambah properti default lainnya
    };
  }

  static revalidate(
    model: any,
    isNew = false
  ): {
    errors: string[];
    errorsMap: Record<string, string>;
  } {
    const errors: string[] = [];
    const errorsMap: Record<string, string> = {};

    if (!model.tagNumber) {
      errors.push('Tag tidak boleh kosong');
      errorsMap['tagNumber'] = 'Wajib diisi';
    }

    // Tambah validasi lainnya...

    return { errors, errorsMap };
  }

  static patch(model: any, path: string, value: any): void {
    // Utility mirip setNestedValue()
    const keys = path.split('.');
    let current = model;
    keys.slice(0, -1).forEach((k) => {
      if (!(k in current)) current[k] = {};
      current = current[k];
    });
    current[keys[keys.length - 1]] = value;
  }
}
