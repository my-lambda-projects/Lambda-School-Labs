const db = require('../database/dbconfig.js');
const Vehicles = require('../vehicles/vehicle-model');

describe('vehicle model', () => {
  beforeEach(async () => {
    await db('vehicle').truncate();
  });

  describe('add function', () => {
    it('inserts vehicles into the DB', async () => {
      let vehicleCount = await db('vehicle');
      expect(vehicleCount).toHaveLength(0);
      await Vehicles.add({ name: 'Travelling Man', user_id: 1 });
      vehicleCount = await db('vehicle');
      expect(vehicleCount).toHaveLength(1);
    });

    it('inserts the provided vehicle into the database', async () => {
      let vehicle = await Vehicles.add({
        user_id: 1,
        name: 'Fun Bus',
        height: 10.2,
        weight: 10900.0,
        width: 12.5,
        length: 32.5,
        axel_count: 2,
        vehicle_class: 'A',
        dual_tires: true,
        trailer: false
      });
      expect(vehicle.name).toBe('Fun Bus');
      expect(vehicle.dual_tires).toBeTruthy();
      expect(vehicle.trailer).toBeFalsy();
    });
  });

  describe('deleteVehicle function', () => {
    it('deletes the specified vehicle from the database', async () => {
      let vehicleCount = await db('vehicle');
      expect(vehicleCount).toHaveLength(0);
      await Vehicles.add({ name: 'The Erased', user_id: 1 });
      vehicleCount = await db('vehicle');
      expect(vehicleCount).toHaveLength(1);
      await Vehicles.deleteVehicle(1);
      vehicleCount = await db('vehicle');
      expect(vehicleCount).toHaveLength(0);
    });
  });

  describe('findById function', () => {
    it('finds a specific vehicle using provided id', async () => {
      await Vehicles.add({ name: 'First One', user_id: 1 });
      await Vehicles.add({ name: 'Second One', user_id: 1 });
      const secondOne = await Vehicles.findById(2);
      expect(secondOne.name).toBe('Second One');
    });
  });

  describe('findUsersVehicles function', () => {
    it('returns list of all users vehicles using the users provided id', async () => {
      await Vehicles.add({ name: 'One', user_id: 1 });
      await Vehicles.add({ name: 'Two', user_id: 1 });
      const usersVehicles = await Vehicles.findUsersVehicles(1);
      expect(usersVehicles).toHaveLength(2);
    });
  });

  describe('updateVehicle function', () => {
    it('should update a specific vehicle', async () => {
      await Vehicles.add({ name: 'One', user_id: 1 });
      let usersVehicle = await Vehicles.findById(1);
      expect(usersVehicle.name).toBe('One');
      await Vehicles.updateVehicle(1, { name: 'Two' });
      usersVehicle = await Vehicles.findById(1);
      expect(usersVehicle.name).toBe('Two');
    });
  });
});
