export default function handleError(error, res) {
  switch (error) {
    default:
      console.error(error);
      res.status(500).send({ error });
      process.exit(1);
  }
}
