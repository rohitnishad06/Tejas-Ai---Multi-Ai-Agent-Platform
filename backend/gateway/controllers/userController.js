export const getCurrentuser = async (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    return res.status(200).json({ message: `get Current user Error ${error}` });
  }
};
