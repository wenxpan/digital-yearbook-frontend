const sampleSchool = {
  classes: [
    {
      name: "Gecko",
      _id: "64e56dbf4aa128eeda489265",
      year: { year: "2009", _id: "64e56dc04aa128eeda48926b" }
      // add total students statistics?
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
      firstName: "John",
      lastName: "Rogers",
      class: "64e56dbf4aa128eeda489265", //better to have {name, _id, year} for class
      email: "john.rogers@gmail.com",
      photo: "https://i.pravatar.cc/300?img=16",
      contactDetails: "+61453267890",
      questionOne: "answer 1",
      questionTwo: "answer 2",
      questionThree: "answer 3",
      questionFour: "answer 4"
      // add a quote property
    },
    {
      _id: "64e56dc04aa128eeda489274",
      firstName: "Rex",
      lastName: "Stevens",
      class: "64e56dbf4aa128eeda489268",
      email: "rex.stevens@gmail.com",
      photo: "https://i.pravatar.cc/300?img=25",
      contactDetails: "+61453267340",
      questionOne: "answer 1",
      questionTwo: "answer 2",
      questionThree: "answer 3",
      questionFour: "answer 4"
    },
    {
      _id: "64e56dc04aa128eeda489244",
      firstName: "Alice",
      lastName: "Brown",
      class: "64e56dbf4aa128eeda489265",
      email: "alice.brown@gmail.com",
      photo: "https://i.pravatar.cc/300?img=7",
      contactDetails: "+61453267451",
      questionOne: "answer 5",
      questionTwo: "answer 6",
      questionThree: "answer 7",
      questionFour: "answer 8",
      quote: "Lorem ipsum dolor sit amet."
    },
    {
      _id: "64ebe102db7a71379484083f",
      firstName: "Bob",
      lastName: "Williams",
      class: "64e56dbf4aa128eeda489266",
      email: "bob.williams@gmail.com",
      photo: "https://i.pravatar.cc/300?img=9",
      contactDetails: "+61453267232",
      questionOne: "answer 9",
      questionTwo: "answer 10",
      questionThree: "answer 11",
      questionFour: "answer 12",
      quote: "Pellentesque euismod justo nec dui hendrerit."
    },
    {
      _id: "64e56dc04aa122eeda489274",
      firstName: "Charlotte",
      lastName: "Davis",
      class: "64e56dbf4aa128eeda489267",
      email: "charlotte.davis@gmail.com",
      photo: "https://i.pravatar.cc/300?img=10",
      contactDetails: "+61453267123",
      questionOne: "answer 13",
      questionTwo: "answer 14",
      questionThree: "answer 15",
      questionFour: "answer 16",
      quote: "Cras ut massa ultricies, tincidunt erat eu, pharetra ex."
    },
    {
      _id: "64e56dc04aa12seeda489274",
      firstName: "Daniel",
      lastName: "Miller",
      class: "64e56dbf4aa128eeda489267",
      email: "daniel.miller@gmail.com",
      photo: "https://i.pravatar.cc/300?img=11",
      contactDetails: "+61453267866",
      questionOne: "answer 17",
      questionTwo: "answer 18",
      questionThree: "answer 19",
      questionFour: "answer 20",
      quote: "Nulla eget tortor a ipsum varius blandit."
    },
    {
      _id: "64e56dc04a2128eeda489274",
      firstName: "Eva",
      lastName: "Jones",
      class: "64e56dbf4aa128eeda489268",
      email: "eva.jones@gmail.com",
      photo: "https://i.pravatar.cc/300?img=12",
      contactDetails: "+61453267976",
      questionOne: "answer 21",
      questionTwo: "answer 22",
      questionThree: "answer 23",
      questionFour: "answer 24",
      quote: "Fusce consectetur felis vel scelerisque."
    },
    {
      _id: "64e56dc01aa128eeda489274",
      firstName: "Frank",
      lastName: "Garcia",
      class: "64e56dbf4aa128eeda489268",
      email: "frank.garcia@gmail.com",
      photo: "https://i.pravatar.cc/300?img=13",
      contactDetails: "+61453267977",
      questionOne: "answer 25",
      questionTwo: "answer 26",
      questionThree: "answer 27",
      questionFour: "answer 28",
      quote: "Suspendisse eget risus vitae augue sodales venenatis."
    }
  ]
}

export default sampleSchool
