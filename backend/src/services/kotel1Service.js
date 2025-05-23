import { Kotel1Model } from '../models/kotelModel.js';

export const readDataKotel1 = async (modbusClient, deviceID, deviceLabel) => {
  try {
    // НЕ вызываем modbusClient.connect();

    const alarms = {
      'Уровень высок': (await modbusClient.readFloat(deviceID, 0x0000, deviceLabel)) >= 1,
      'Уровень низок': (await modbusClient.readFloat(deviceID, 0x0002, deviceLabel)) >= 1,
      'Разрежение мало ': (await modbusClient.readFloat(deviceID, 0x0004, deviceLabel)) >= 1,
      'Давление воздуха низко': (await modbusClient.readFloat(deviceID, 0x0006, deviceLabel)) >= 1,
      'Давление газа низко': (await modbusClient.readFloat(deviceID, 0x0008, deviceLabel)) >= 1,
      'Давление газа высоко': (await modbusClient.readFloat(deviceID, 0x000A, deviceLabel)) >= 1,
      'Факел горелки погас': (await modbusClient.readFloat(deviceID, 0x000C, deviceLabel)) >= 1,
      'Дымосос отключен': (await modbusClient.readFloat(deviceID, 0x000E, deviceLabel)) >= 1,
      'Останов по команде': (await modbusClient.readFloat(deviceID, 0x0010, deviceLabel)) >= 1,
    };

    const info = {
      'Клапан запальника': (await modbusClient.readFloat(deviceID, 0x0012, deviceLabel)) >= 1,
      'Искрообразование': (await modbusClient.readFloat(deviceID, 0x0014, deviceLabel)) >= 1,
      'Розжиг запальника': (await modbusClient.readFloat(deviceID, 0x0016, deviceLabel)) >= 1,
      'Останов котла': (await modbusClient.readFloat(deviceID, 0x0018, deviceLabel)) >= 1,
      'Режим вентиляции': (await modbusClient.readFloat(deviceID, 0x001A, deviceLabel)) >= 1,
      'Режим стабилизации запальника': (await modbusClient.readFloat(deviceID, 0x001C, deviceLabel)) >= 1,
      'Розжиг горелки': (await modbusClient.readFloat(deviceID, 0x001E, deviceLabel)) >= 1,
      'Режим стабилизации горелки': (await modbusClient.readFloat(deviceID, 0x0020, deviceLabel)) >= 1,
      'Клапан отсекатель': (await modbusClient.readFloat(deviceID, 0x0022, deviceLabel)) >= 1,
      'Рабочий режим': (await modbusClient.readFloat(deviceID, 0x0024, deviceLabel)) >= 1,
      'Факел запальника': (await modbusClient.readFloat(deviceID, 0x0026, deviceLabel)) >= 1,
      'Факел горелки': (await modbusClient.readFloat(deviceID, 0x0028, deviceLabel)) >= 1,
      'Работа дымососа': (await modbusClient.readFloat(deviceID, 0x002A, deviceLabel)) >= 1,
      'Индикация работы вентилятора': (await modbusClient.readFloat(deviceID, 0x0044, deviceLabel)) >= 1,
      'Импульс больше': (await modbusClient.readFloat(deviceID, 0x0046, deviceLabel)) >= 1,
      'Импульс меньше': (await modbusClient.readFloat(deviceID, 0x0048, deviceLabel)) >= 1,
    };

    const parameters = {
      'Уровень в барабане котла': ((await modbusClient.readFloat(deviceID, 0x002C, deviceLabel)) * 6.3 +
        (-315)).toFixed(0),
      // 'Расход питательной воды котла ': ((await modbusClient.readFloat(deviceID, 0x002E, deviceLabel))).toFixed(0) ,
      'Разрежение в топке котла': ((await modbusClient.readFloat(deviceID, 0x0030, deviceLabel)) * 0.25 +
        -(12.5)).toFixed(1),
      'Давление воздуха перед горелкой': ((await modbusClient.readFloat(deviceID, 0x0032, deviceLabel)) * 2.5).toFixed(
        0),
      'Давление газа перед горелкой': ((await modbusClient.readFloat(deviceID, 0x0034, deviceLabel)) * 40).toFixed(0),
      'Давление пара на выходе': ((await modbusClient.readFloat(deviceID, 0x0036, deviceLabel)) * 0.16).toFixed(1),
      // 'Расход пара котла ': ((await modbusClient.readFloat(deviceID, 0x0038, deviceLabel))).toFixed(0) ,
    };

    const im = {
      'ИМ уровня': (await modbusClient.readFloat(deviceID, 0x003A, deviceLabel)).toFixed(0),
      'ИМ разрежения': (await modbusClient.readFloat(deviceID, 0x003C, deviceLabel)).toFixed(0),
      'ИМ воздуха': (await modbusClient.readFloat(deviceID, 0x003E, deviceLabel)).toFixed(0),
      'ИМ газа': (await modbusClient.readFloat(deviceID, 0x0040, deviceLabel)).toFixed(0),
    };

    const others = {
      'Время вентиляции': (await modbusClient.readFloat(deviceID, 0x0042, deviceLabel)),
      'Задание на уровень': (await modbusClient.readFloat(deviceID, 0x004A, deviceLabel)),
    };

    // Формирование объекта данных
    const formattedDataKotel1 = {
      parameters: parameters,
      info: info,
      alarms: alarms,
      im: im,
      others: others,
      lastUpdated: new Date(),
    };

    // Сохранение данных в базу данных
    await new Kotel1Model(formattedDataKotel1).save();
    // console.log(formattedDataKotel1);
  } catch (err) {
    console.error(`[${deviceLabel}] Ошибка при чтении данных:`, err);
  }
};
