import { Router } from 'express';

import * as multer from '../config/multer';
import * as vaccineController from '../controllers/vaccine';
import { validateCreate, validateUpdate, validatePatchUpdate } from '../validators/vaccine';

const router = Router();

router.get('/', vaccineController.getAllVaccines);
router.get('/count', vaccineController.getCount);
router.post('/', multer.single('photoUrl'), validateCreate, vaccineController.createVaccine);

router.get('/:id', vaccineController.getVaccineById);
router.put('/:id', multer.single('photoUrl'), validateUpdate, vaccineController.updateVaccine);
router.patch('/:id', validatePatchUpdate, vaccineController.updateMandatoryStatus);
router.delete('/:id', vaccineController.deleteVaccine);

module.exports = router;
