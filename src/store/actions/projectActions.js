export const createProject = project => {
    // returning a function which is halting a dispatch
    return (dispatch, getState, { getFirebase, getFirestore }) => {
      const firestore = getFirestore();
      const profile = getState().firebase.profile;
      const authorId = getState().firebase.auth.uid;
      firestore
        .collection("books")
        .add({
          ...project,
          authorFirstName: profile.firstName,
          authorLastName: profile.lastName,
          authorId: authorId,
          createdAt: new Date()
        })
        .then(() => {
          dispatch({ type: "CREATE_PROJECT", project });
        })
        .catch(err => {
          dispatch({ type: "CREATE_PROJECT_ERROR", err });
        });
    };
  };
  