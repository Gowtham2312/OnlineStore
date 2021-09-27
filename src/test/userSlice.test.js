import reducer,{ clearUserLoginStatus } from '../redux-store/userSlice'

it("should return the initial state", () => {

    expect(

      reducer(

        {

            userObj: {},

            isSuccess: false,

            isLoading: false,

            isError: false,

            invalidLoginMessage:" "

        },

        {}

      )

    ).toEqual({

        userObj: {},

        isSuccess: false,

        isLoading: false,

        isError: false,

        invalidLoginMessage:" "

    });

});

it("should reset the user", () => {

   expect(

     reducer(

       {

         userObj: { username: "testUser", password: "testpassword" },

         isSuccess: true,

         isLoading: false,

         invalidLoginMessage: "",

       },

     clearUserLoginStatus()

     )

   ).toEqual({

     userObj: {},

     isSuccess: false,

     isLoading: false,

     invalidLoginMessage: "",

   });

 });