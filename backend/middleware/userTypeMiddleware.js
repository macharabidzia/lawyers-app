const isLawyer = (req, res, next) => {
  if (req.user && req.user.isLawyer) {
    next();
  } else {
    res.status(401);
    throw new Error('You are not a lawyer');
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};
export { isLawyer, isAdmin };
