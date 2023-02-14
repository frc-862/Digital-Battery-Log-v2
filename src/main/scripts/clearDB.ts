import '../db/db';
import { BatteryRecordDocument } from '../types';
import { batteryRecord } from '../db/models/battery';

const clearDB = async () => {
    try {
        const logs: BatteryRecordDocument[] = await batteryRecord.find();
        logs.forEach((log: BatteryRecordDocument) => {
            log.remove();
        });
        console.log('DB cleared');
        process.exit();
    } catch (error) {
        console.log(error);
        process.exit();
    }
}
clearDB();