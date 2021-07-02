const genuuid = require("uuid").v4;

const { Tree: Trees, columns: column } = require("./trees.model");

const columns = [...column, "parent", "partner"];

exports.getTree = async (req, res) => {
  try {
    const trees = await Trees.query()
      .select(...columns)
      .withGraphFetched("[parents as parent, partners as partner]")
      .where("user", req.user.id);

    if (trees.length > 0) {
      return res.status(200).json({ trees, status: "success" });
    } else {
      return res.status(404).json({
        status: "failed",
        message: "No family members yet",
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

exports.getTreeById = async (req, res) => {
  try {
    const param = req.params.id;
    const tree = await Trees.query()
      .select(...columns)
      .where("id", req.params.id)
      .withGraphFetched("[parents as parent, partners as partner]")
      .first();
    if (!tree) {
      return res.status(404).json({
        status: "failed",
        message: "family member not found",
      });
    }
    return res.status(200).json({ tree, status: "success" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "failed",
      message: err,
    });
  }
};

exports.createTree = async (req, res) => {
  try {
    const obj = {
      id: req.body.id,
      DOB: req.body.dob,
      name: req.body.name,
      depth: req.body.depth,
      gender: req.body.gender,
      parent: req.body.parent === 'null'? null : req.body.parent,
      user: req.user.id,
      photourl: req.file ? req.file.path : null,
      status: "active",
    };
    console.log(obj);
    let tree = await Trees.query().insertGraph(obj, { relate: ["user"] });
    console.log(tree);
    if (req.body.type === "children" || req.body.type === "sibling") {
      tree = await Trees.query()
        .where("id", req.body.id)
        .withGraphFetched("[parents as parent, partners as partner]")
        .first();
    } else if (req.body.type === "partner") {
      await Trees.query().findById(req.body.ref).patch({ partner: tree.id });
      await Trees.query().findById(tree.id).patch({ partner: req.body.ref });
      tree = await Trees.query()
        .where("id", req.body.id)
        .withGraphFetched("[parents as parent, partners as partner]")
        .first();
    } else {
      // TODO: check whether to retrive every data
      await Trees.query().patchAndFetchById(req.body.ref, {
        parent: tree.id,
      });
      await Trees.query().patch({ depth: 0 }).whereNotIn("id", [tree.id]);
      tree = await Trees.query().withGraphFetched(
        "[parents as parent, partners as partner]"
      );
    }
    if (tree) {
      return res.status(201).json({
        tree,
        status: "success",
        message: "Tree created Successfully",
      });
    } else {
      return res.status(422).json({
        status: "failed",
        message: "Unable to process the request",
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

exports.updateTree = async (req, res) => {
  try {
    const id = req.params.id;
    const tree = await Trees.query().where({
      id: req.params.id,
    });
    const updatedTree = {
      name: req.body.name ? req.body.name : tree.name,
      gender: req.body.gender ? req.body.gender : tree.gender,
      DOB: req.body.dob ? req.body.dob : tree.DOB,
      photourl: req.file ? req.file.path : tree.photourl,
      updated_at: new Date(),
    };
    let result = await Trees.query()
      .select(...columns)
      .patchAndFetchById(id, updatedTree);

    if (result) {
      return res.status(201).json({
        tree: result,
        status: "success",
        message: "Tree updated Successfully",
      });
    } else {
      return res.status(422).json({
        status: "failed",
        message: "Unable to process the request",
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
