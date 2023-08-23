const sampleSchool = {
  classes: [
    {
      name: "Gecko",
      _id: "64e56dbf4aa128eeda489265",
      year: { year: "2009", _id: "64e56dc04aa128eeda48926b" }
    },
    {
      name: "Salamander",
      _id: "64e56dbf4aa128eeda489266",
      year: { year: "2009", _id: "64e56dc04aa128eeda48926b" }
    },
    {
      name: "Kangaroo",
      _id: "64e56dbf4aa128eeda489267",
      year: { year: "2010", _id: "64e56dc04aa128eeda48926e" }
    },
    {
      name: "Possum",
      _id: "64e56dbf4aa128eeda489268",
      year: { year: "2010", _id: "64e56dc04aa128eeda48926e" }
    }
  ],
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
    },
    {
      firstname: "Alice",
      lastname: "Brown",
      class: "64e56dbf4aa128eeda489265",
      email: "alice.brown@gmail.com",
      photo: "http://images.google.com/",
      contactdetails: "+61453267451",
      questionone: "answer 5",
      questiontwo: "answer 6",
      questionthree: "answer 7",
      questionfour: "answer 8",
      quote: "Lorem ipsum dolor sit amet."
    },
    {
      firstname: "Bob",
      lastname: "Williams",
      class: "64e56dbf4aa128eeda489266",
      email: "bob.williams@gmail.com",
      photo: "http://images.google.com/",
      contactdetails: "+61453267232",
      questionone: "answer 9",
      questiontwo: "answer 10",
      questionthree: "answer 11",
      questionfour: "answer 12",
      quote: "Pellentesque euismod justo nec dui hendrerit."
    },
    {
      firstname: "Charlotte",
      lastname: "Davis",
      class: "64e56dbf4aa128eeda489267",
      email: "charlotte.davis@gmail.com",
      photo: "http://images.google.com/",
      contactdetails: "+61453267123",
      questionone: "answer 13",
      questiontwo: "answer 14",
      questionthree: "answer 15",
      questionfour: "answer 16",
      quote: "Cras ut massa ultricies, tincidunt erat eu, pharetra ex."
    },
    {
      firstname: "Daniel",
      lastname: "Miller",
      class: "64e56dbf4aa128eeda489267",
      email: "daniel.miller@gmail.com",
      photo: "http://images.google.com/",
      contactdetails: "+61453267866",
      questionone: "answer 17",
      questiontwo: "answer 18",
      questionthree: "answer 19",
      questionfour: "answer 20",
      quote: "Nulla eget tortor a ipsum varius blandit."
    },
    {
      firstname: "Eva",
      lastname: "Jones",
      class: "64e56dbf4aa128eeda489268",
      email: "eva.jones@gmail.com",
      photo: "http://images.google.com/",
      contactdetails: "+61453267976",
      questionone: "answer 21",
      questiontwo: "answer 22",
      questionthree: "answer 23",
      questionfour: "answer 24",
      quote: "Fusce consectetur felis vel scelerisque."
    },
    {
      firstname: "Frank",
      lastname: "Garcia",
      class: "64e56dbf4aa128eeda489268",
      email: "frank.garcia@gmail.com",
      photo: "http://images.google.com/",
      contactdetails: "+61453267977",
      questionone: "answer 25",
      questiontwo: "answer 26",
      questionthree: "answer 27",
      questionfour: "answer 28",
      quote: "Suspendisse eget risus vitae augue sodales venenatis."
    }
  ]
}

export default sampleSchool
