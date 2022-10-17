import { Router } from 'express';

import storage from '../config/multer';
import { validateCreateVaccine, validateUpdateVaccine } from '../validators/vaccine';
import { createVaccine, deleteVaccine, getAllVaccines, getVaccine, updateVaccine } from '../controllers/vaccine';

const router = Router();

router.get('/', getAllVaccines);
router.get('/:id', getVaccine);
router.post('/', storage.single('photoUrl'), validateCreateVaccine, createVaccine);
router.put('/:id', storage.single('photoUrl'), validateUpdateVaccine, updateVaccine);
router.delete('/:id', deleteVaccine);

module.exports = router;
