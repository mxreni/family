const Event = require("./events.model");

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.query().withGraphFetched("[member]");
    if (events.length > 0) {
      return res.status(200).json({ events, status: "success" });
    } else {
      return res.status(404).json({
        status: "failed",
        message: "No events yet",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "failed",
      message: err,
    });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const param = req.params.id;
    const event = await Event.query()
      .where("id", req.params.id)
      .withGraphFetched("[member]")
      .first();
    if (!event) {
      return res.status(404).json({
        status: "failed",
        message: "family member not found",
      });
    }
    return res.status(200).json({ event, status: "success" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "failed",
      message: err,
    });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const event = await Event.query().insert({
      ...req.body,
    });
    console.log(event);
    if (event) {
      return res.status(200).json({
        ...event,
        status: "success",
        message: "event created successfully",
      });
    } else {
      return res.status(422).json({
        status: "failed",
        message: "Something went wrong",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "failed",
      message: err,
    });
  }
};

exports.updateEvent = async (req, res, next) => {
  try {
    const event = await Event.query().where("id", req.params.id);
    const updatedEvent = {
      person: req.body.person ? req.body.person : event.person,
      type: req.body.type ? req.body.type : event.type,
      name: req.body.name ? req.body.name : event.name,
      description: req.body.description
        ? req.body.description
        : event.description,
      from_date: req.body.from_date ? req.body.from_date : event.from_date,
      to_date: req.body.to_date ? req.body.to_date : user.to_date,
      updatedAt: new Date().toISOString(),
      eventImageUrl: req.file ? req.file.filename : event.eventImageUrl,
    };
    let result = await Event.query().patchAndFetchById(
      {
        id: req.user.id,
      },
      updatedEvent
    );
    console.log(result);
    if (!result) {
      return res.status(422).json({
        status: "failed",
        message: "Unable to update the event",
      });
    }
    return res.status(201).json({
      user: result,
      status: "success",
      message: `Updated ${req.params.id} event successfully`,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "failed",
      message: "Something went wrong",
    });
  }
};
