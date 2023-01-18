import cors from "cors";
import express from "express";
import {
  viewsRouter,
  userRouter,
  productRouter,
  orderRouter,
  categoryRouter,
  imageRouter,
} from "./routers";
import { errorHandler } from "./middlewares";
const fs = require("fs");

const app = express();

// CORS 에러 방지
app.use(cors());

// Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());

// Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.urlencoded({ extended: false }));

// html, css, js 라우팅
app.use(viewsRouter);

// api 라우팅
// 아래처럼 하면, userRouter 에서 '/login' 으로 만든 것이 실제로는 앞에 /api가 붙어서
// /api/login 으로 요청을 해야 하게 됨. 백엔드용 라우팅을 구분하기 위함임.
app.use("/api", userRouter);
app.use("/api", orderRouter);
app.use("/api", productRouter);
app.use("/api/images", imageRouter);
app.use("/api/category", categoryRouter);
// app.all("*", (req, res, next) => {
//   let data = {
//     code: "404",
//     message: "존재하지 않는 페이지 입니다..!",
//   };
//   res.send(data);
// });
// 동영상 업로드

app.use(express.static("views"));

app.get("/image/background.mp4", (req, res) => {
  res.sendFile(__dirname + "/image/background.mp4");
});

app.get("/image/abstract", (req, res) => {
  res.sendFile(__dirname + "/abstract");
});

// 순서 중요 (errorHandler은 다른 일반 라우팅보다 나중에 있어야 함)
// 그래야, 에러가 났을 때 next(error) 했을 때 여기로 오게 됨
app.use(errorHandler);

export { app };
