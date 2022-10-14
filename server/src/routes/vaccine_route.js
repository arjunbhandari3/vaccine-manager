import { Router } from 'express';

import { validateCreateVaccine, validateUpdateVaccine } from '../validators/vaccine';
import { createVaccine, deleteVaccine, getAllVaccines, getVaccine, updateVaccine } from '../controllers/vaccine';

const router = Router();

router.get('/', getAllVaccines);
router.get('/:id', getVaccine);
router.post('/', validateCreateVaccine, createVaccine);
router.put('/:id', validateUpdateVaccine, updateVaccine);
router.delete('/:id', deleteVaccine);

module.exports = router;
