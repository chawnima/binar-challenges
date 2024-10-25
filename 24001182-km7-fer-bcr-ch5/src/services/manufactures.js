const manufactureRepository = require("../repositories/manufactures");
const { imageUpload } = require("../utils/image-kit");

exports.getManufactures = async (req) => {
  return Object.keys(req.query).length
    ? await manufactureRepository.getManufacturesByQuery(
        req.query.name,
        req.query.characteristic,
        req.query.style
      )
    : await manufactureRepository.getManufactures();
};

exports.getManufactureById = async (id) => {
  return await manufactureRepository.getManufactureById(id);
};

exports.createManufacture = async (data, file) => {
  if (file?.logo) {
    data.logo = await imageUpload(file.logo);
  }
  return await manufactureRepository.createManufacture(data);
};

exports.updateManufacture = async (id, data, file) => {
  if (file?.logo) {
    data.logo = await imageUpload(file.logo);
  }
  return await manufactureRepository.updateManufacture(id, data);
};

exports.deleteManufactureById = async (id) => {
  return await manufactureRepository.deleteManufactureById(id);
};
