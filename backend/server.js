const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const authRouter = require("./routes/authrouter");
const employerrRouter = require("./routes/employerrrouter");
const jobRouter = require("./routes/jobrouter");
const applicationRouter = require("./routes/application");
const settingRouter = require("./routes/settingroutes"); 
const resumeRoutes = require("./routes/resumeRoutes");
const companyRoutes = require("./routes/companyRoutes")

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); 
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Hello Server");
});

app.use("/api/auth", authRouter);
app.use("/api/employerr", employerrRouter);
app.use("/api/job", jobRouter);
app.use("/api/applications", applicationRouter);
app.use("/api/setting", settingRouter);
app.use("/api/resumes", resumeRoutes);
app.use("/api/company", companyRoutes);


app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
