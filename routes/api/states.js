const express = require("express");
const router = express();
const stateController = require("../../controller/stateController");

router
    .route("/")
    .get(stateController.GetStates)
    .post(stateController.Newstates)
    .put(stateController.updateState)
    .delete(stateController.removeState)

router.route("/:id").get(stateController.Getstate);

module.exports = router;