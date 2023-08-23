const sampleSchool = {
  years: [
    {
      year: "2009",
      _id: "64e56dc04aa128eeda48926b",
      classes: [
        { name: "Gecko", _id: "64e56dbf4aa128eeda489265" },
        { name: "Salamander", _id: "64e56dbf4aa128eeda489266" }
      ]
    },
    {
      year: "2010",
      _id: "64e56dc04aa128eeda48926e",
      classes: [
        { name: "Kangaroo", _id: "64e56dbf4aa128eeda489267" },
        { name: "Possum", _id: "64e56dbf4aa128eeda489268" }
      ]
    }
  ],
  students: [
    {
      _id: "64e56dc04aa128eeda489273",
      firstname: "John",
      lastname: "Rogers",
      class: "64e56dbf4aa128eeda489265",
      email: "john.rogers@gmail.com",
      photo: "http://images.google.com/",
      contactdetails: "+61453267890",
      questionone: "answer 1",
      questiontwo: "answer 2",
      questionthree: "answer 3",
      questionfour: "answer 4"
    },
    {
      _id: "64e56dc04aa128eeda489274",
      firstname: "Rex",
      lastname: "Stevens",
      class: "64e56dbf4aa128eeda489268",
      email: "rex.stevens@gmail.com",
      photo: "http://images.google.com/",
      contactdetails: "+61453267340",
      questionone: "answer 1",
      questiontwo: "answer 2",
      questionthree: "answer 3",
      questionfour: "answer 4"
    }
  ]
}

export default sampleSchool
