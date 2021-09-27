import reducer,{ clearAdminLoginStatus } from '../redux-store/adminSlice'

it("should return the initial state", () => {

    expect(

      reducer(

        {

            adminObj: {},

            Success: false,

            isLoading: false,

            isError: false,

            invalidLoginMessage:" "

        },

        {}

      )

    ).toEqual({

        adminObj: {},

        Success: false,

        isLoading: false,

        isError: false,

        invalidLoginMessage:" "

    });

});

it("should reset the user", () => {

   expect(

     reducer(

       {

         adminObj: { adminname: "testAdmin", password: "testpassword" },

         Success: true,

         isLoading: false,

         invalidLoginMessage: "",

       },

     clearAdminLoginStatus()

     )

   ).toEqual({

     adminObj: {},

     Success: false,

     isLoading: false,

     invalidLoginMessage: "",

   });

 });