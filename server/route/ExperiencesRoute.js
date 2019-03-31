const router = require('express').Router();
const ExperienceController = require('../controller/ExperienceController');


router.get('/', ExperienceController.listFromCache, ExperienceController.list);
router.post('/', ExperienceController.create);

router.use('/:id', ExperienceController.validateId); //usando o validate para todos os caminhos abaixo.
	router.get('/:id', ExperienceController.byId);
	router.put('/:id', ExperienceController.update);
	router.delete('/:id', ExperienceController.delete);


module.exports = router;