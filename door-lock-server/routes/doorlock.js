const express = require("express");
const router = express.Router();
const cors = require("cors"); // cors 라이브러리 import

const { User } = require("../models/user");

router.use(cors()); // cors 사용
router.use(express.json());

// 무적 상태 활성화/비활성화
router.post("/force", (req, res, next) => {
  const data = { userId: req.body.userId, forceData: req.body.forceData };
  User.updateForceById(data).then(result => {
    res.json({ message: "무적 변경" });
  });
});

// 도어락 비밀번호 설정
router.post("/set-doorlock-password", (req, res, next) => {
  const data = { userId: req.body.userId, doorlockPassword: req.body.doorlockPassword };

  console.log(data);
  if (data.doorlockPassword === undefined || data.doorlockPassword === null) {
    return res.json({ message: "도어락 비밀번호 입력을 안했잖아" });
  }

  User.updateDoorlockPasswordById(data).then(result => {
    res.json({ message: "도어락 비밀번호 설정완료" });
  });
});

// 임시 비밀번호
router.post("/temporary-password", (req, res, next) => {});

// 이용내역 데이터 요청
router.post("/usage-history-get", (req, res, next) => {
  const userId = req.body.userId;

  User.findById({ userId: userId }).then(result => {
    res.json({ usageHistory: result.usageHistory });
  });
});
// 이용내역 데이터 저장
router.post("/usage-history-post", (req, res, next) => {
  const { userId, openHistory, dateHistory, timeHistory } = { ...req.body };

  const usageHistory = { userId, openHistory, dateHistory, timeHistory };

  User.findById({ userId: userId }).then(result => {
    const tempUsageHistory = result.usageHistory;
    tempUsageHistory.push(usageHistory);

    User.addUsageHistory({ userId: userId, usageHistory: tempUsageHistory })
      .then(result => {
        return res.json({ result: "success", message: "이용내역이 잘 저장되었어" });
      })
      .catch(err => {
        console.log("usage history Err:", err);
      });
  });
});

// 도어락 상태 불러오기
router.get("/doorlock-status-get", (req, res, next) => {
  User.findById({ userId: "test" })
    .then(result => {
      res.json({ doorlockStatus: result.doorlockStatus });
    })
    .catch(err => {
      console.log(err);
    });
});

// 도어락 오픈
router.post("/door-open", (req, res, next) => {
  const { userId, doorlockStatus } = { ...req.body };

  console.log(userId, doorlockStatus);
  if (doorlockStatus != true && doorlockStatus != false) {
    return res.status(404).json({ message: "잘못된 요청이다." });
  }

  User.updateDoorlockStatus({ userId: userId, doorlockStatus: doorlockStatus })
    .then(result => {
      if (doorlockStatus) {
        return res.json({ message: "open", doorlockStatus: doorlockStatus });
      } else {
        return res.json({ message: "close", doorlockStatus: doorlockStatus });
      }
    })
    .catch(err => {
      console.log("도어락 열림 오류 : ", err);
    });
});

module.exports = router;
