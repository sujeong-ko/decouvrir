import { Router } from "express";
import is from "@sindresorhus/is";
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { loginRequired } from "../middlewares";
import { userService } from "../services";

const userRouter = Router();

userRouter.post("/register", async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    const {
      fullName,
      password,
      email,
      phoneNumber,
      address,
      painterName,
      introduce,
      role,
    } = req.body;
    const newUserInfo = {
      fullName,
      password,
      email,
      phoneNumber,
      address,
      painterName,
      introduce,
      role,
    };

    const newUser = await userService.addUser(newUserInfo);

    // 추가된 유저의 db 데이터를 프론트에 다시 보내줌
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

// 로그인 api (아래는 /login 이지만, 실제로는 /api/login로 요청해야 함.)
userRouter.post("/login", async function (req, res, next) {
  try {
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    const email = req.body.email;
    const password = req.body.password;

    // 로그인 진행 (로그인 성공 시 jwt 토큰을 프론트에 보내 줌)
    const userToken = await userService.getUserToken({ email, password });

    /// jwt 토큰을 프론트에 보냄 (jwt 토큰은, 문자열임)
    res.status(200).json({ userToken });
  } catch (error) {
    next(error);
  }
});

userRouter.get("/monthlyPainter", async function (req, res, next) {
  try {
    const painters = await userService.getPainters();
    res.json(painters);
  } catch (error) {
    next(error);
  }
});

// 전체 유저 목록을 가져옴 (배열 형태)
// 미들웨어로 loginRequired 를 썼음 (이로써, jwt 토큰이 없으면 사용 불가한 라우팅이 됨)
userRouter.get("/userlist", async function (req, res, next) {
  try {
    // 전체 사용자 목록을 얻음
    const users = await userService.getUsers();

    // 사용자 목록(배열)을 JSON 형태로 프론트에 보냄
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

userRouter.get("/user", loginRequired, async function (req, res, next) {
  try {
    const userId = req.currentUserId;
    const user = await userService.getOneUser(userId);
    res.json(user);
    // res.status(200).json(currentUserInfo);
  } catch (error) {
    next(error);
  }
});

// 사용자 정보 수정
// (예를 들어 /api/users/abc12345 로 요청하면 req.params.userId는 'abc12345' 문자열로 됨)
userRouter.patch(
  "/users/:userNumber",
  loginRequired,
  async function (req, res, next) {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          "headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }

      // params로부터 userNumber를 가져옴(요청할 때 가독성을 위해 설정)
      const userNumber = req.params.userNumber;
      // login-required에서 설정해준 현재 로그인 된 id
      const userId = req.currentUserId;

      // body data 로부터 업데이트할 사용자 정보를 추출함.
      // 확인용으로 사용할 현재 비밀번호도 추출
      const {
        fullName,
        password,
        address,
        phoneNumber,
        role,
        currentPassword,
        painterName,
        introduce,
      } = req.body;

      // currentPassword 없을 시, 진행 불가
      if (!currentPassword) {
        throw new Error("정보를 변경하려면, 현재의 비밀번호가 필요합니다.");
      }

      const userInfo = { userId, currentPassword, userNumber };

      // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
      // 보내주었다면, 업데이트용 객체에 삽입함.
      const toUpdate = {
        ...(fullName && { fullName }),
        ...(password && { password }),
        ...(address && { address }),
        ...(phoneNumber && { phoneNumber }),
        ...(role && { role }),
        ...(painterName && { painterName }),
        ...(introduce && { introduce }),
      };

      // 사용자 정보를 업데이트
      const updatedUserInfo = await userService.setUser(userInfo, toUpdate);

      // 업데이트 이후의 유저 데이터를 프론트에 보내 줌
      res.status(200).json(updatedUserInfo);
    } catch (error) {
      next(error);
    }
  }
);

// 유저 delete 변경
userRouter.delete(
  "/user/:userNumber",
  loginRequired,
  async function (req, res, next) {
    try {
      const userNumber = req.params.userNumber;
      await userService.deleteUser(userNumber);

      res.status(200).json(userNumber);
    } catch (error) {
      next(error);
    }
  }
);

export { userRouter };
