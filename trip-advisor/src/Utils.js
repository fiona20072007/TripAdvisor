import firebase from "./firebase";
const db = firebase.firestore();

export async function searchLoadOptions(inputValue) {
  return new Promise((resolve) => {
    db.collection("indexCountry")
      .orderBy("name")
      .startAt(inputValue)
      .endAt(inputValue + "\uf8ff")
      .get()
      .then((docs) => {
        if (!docs.empty) {
          let recommendedTags = [];
          docs.forEach(function (doc) {
            const tag = {
              value: doc.id,
              label: doc.data().name,
            };
            recommendedTags.push(tag);
          });
          return resolve(recommendedTags);
        } else {
          return resolve([]);
        }
      });
  });
}

export async function searchLocationLoadOptions(inputValue, tags) {
  return new Promise((resolve) => {
    db.collection("country")
      .doc(tags)
      .collection("location")
      .orderBy("plainName")
      .startAt(inputValue)
      .endAt(inputValue + "\uf8ff")
      .get()
      .then((docs) => {
        if (!docs.empty) {
          let recommendedTags = [];
          docs.forEach(function (doc) {
            const tag = {
              value: doc.id,
              label: doc.data().tagName,
            };
            recommendedTags.push(tag);
          });
          return resolve(recommendedTags);
        } else {
          return resolve([]);
        }
      });
  });
}

export function handleStar(num) {
  return (Number(num) / 5.4) * 100;
}

export function scrollIntoView(id) {
  window.setTimeout(
    () =>
      document.getElementById(id).scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      }),
    10
  );
}

export function setLikeListEmpty(userId) {
  db.collection("schedule").doc(userId).set(
    {
      like: [],
    },
    { merge: true }
  );
}

export function setLikeDb(userId, likeArr) {
  db.collection("schedule").doc(userId).set(
    {
      like: likeArr,
    },
    { merge: true }
  );
}

export const getTravelTitleData = (userId, travelId) => {
  return db
    .collection("schedule")
    .doc(userId)
    .collection("data")
    .doc(`travel${travelId}`)
    .get();
};

export const deleteTravel = (userId, travelId) => {
  return db
    .collection("schedule")
    .doc(userId)
    .collection("data")
    .doc(`travel${travelId}`)
    .delete()
    .then(() => {
      console.log(11111);
    });
};

export const getTravelScheduleData = (userId, travelId) => {
  return db
    .collection("schedule")
    .doc(userId)
    .collection("data")
    .doc(`travel${travelId}`)
    .collection("dateBlockDetail")
    .get();
};

export const getLocationDetail = (searchCountry) => {
  return db
    .collection("country")
    .doc(searchCountry)
    .collection("location")
    .get();
};

export const getLikeList = (userId) => {
  return db.collection("schedule").doc(userId).get();
};
export const likeList = (userId) => {
  return db.collection("schedule").doc(userId);
};

export const setSchedule = (
  userId,
  travelShowId,
  droppableId,
  travelMorningArr
) => {
  return db
    .collection("schedule")
    .doc(userId)
    .collection("data")
    .doc(`travel${travelShowId}`)
    .collection("dateBlockDetail")
    .doc(droppableId)
    .set({
      morning: travelMorningArr,
      name: droppableId,
    });
};

export const getTravelTitleDetail = (userId, travelShowId) => {
  return db
    .collection("schedule")
    .doc(userId)
    .collection("data")
    .doc("travel" + travelShowId);
};

export function setNavbarColor(path) {
  if (window.location.pathname.substring(1, 9) === path) {
    document.querySelector("nav").style.backgroundColor = "white";
    document.querySelector("nav").style.boxShadow =
      "0 0 8px rgba(0, 0, 0, 0.2)";
    document.getElementById("MainTitle").style.color = "rgb(138, 134, 134)";
    document.getElementById(`mobileNav1`).style.color = "rgb(138, 134, 134)";
    document.getElementById(`mobileNav2`).style.color = "rgb(138, 134, 134)";
    document.getElementById(`mobileNav3`).style.color = "rgb(138, 134, 134)";
    document.getElementById("mobileNav").style.backgroundColor =
      "rgba(245, 247, 249, 0.947)";
  }
}
export function setNavbarTransparent(path) {
  if (window.location.pathname === path) {
    document.querySelector("nav").style.backgroundColor = "transparent";
    document.querySelector("nav").style.boxShadow = "0 0 0";
    document.getElementById("MainTitle").style.color = "white";
    document.getElementById(`mobileNav1`).style.color = "white";
    document.getElementById(`mobileNav2`).style.color = "white";
    document.getElementById(`mobileNav3`).style.color = "white";
    document.getElementById("mobileNav").style.backgroundColor = "transparent";
  }
}
