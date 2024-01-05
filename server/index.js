const sequelize = require("./config/sequelize");
const app = require("./app");

const port = process.env.PORT || 5000;

app.listen(port, async () => {
  await sequelize.sync({ force: true });
  console.log(`Server is running on port ${port}`);
});