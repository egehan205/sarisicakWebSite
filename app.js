//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const homeStartingContent = "";
const aboutContent = [
  "   Yaşıtlarına göre değerlendirildiğinde bedensel, bilişsel, sosyal, duygusal, öz bakım yönünden fark edilir biçimde yetersizliği bulunan bireylere “özel eğitime ihtiyaç duyan bireyler” denir. Bu bireylerin yetersizliklerinden en az düzeyde etkilenmesini sağlamak, bireylerin toplumla kaynaşmasına ve bağımsız olarak yaşayabilmelerine destek vermek amacıyla; bireylerin yetersizliklerine uygun ortamlarda, onlar için geliştirilmiş özel yöntemlerle sürdürülen eğitime ise “özel eğitim” denir. ",
  "   Bizde Milas Sarı Sıcak Özel Eğitim ve Rehabilitasyon Merkezi olarak 2007 yılından itibaren özel eğitime ihtiyaç duyan bireylerimize, açılış tarihinden aralıksız hizmet vermekteyiz. Merkezimiz bünyesinde fizik tedavi salonumuz, işitme engelliler bireysel-grup odamız, yaygın gelişimsel bireysel-grup odamız, zihinsel engelliler bireysel, zihinsel engelliler grup odamız, psikolojik destek odamız bulunmaktadır.",
  "   Eğitim merkezimizin kuruluşunda benimsediğimiz ilke ulu önder M. Kemal Atatürk’ün “Eğitimde feda edilecek tek bir fert yoktur.” sözüdür.  Bu söz aynı zamanda okulumuzun vizyonunu da ifade etmektedir. Yetersizliği olan bireylerin topluma kazandırılmasını sağlamak, bağımsız yaşayabilmelerine destek vermek, bu süreçte kendilerine ve ailelerine rehberlik etmek ise benimsediğimiz misyonumuzdur. ",
  "   Merkezimiz; zihinsel, sosyal, görsel, ruhsal, duyusal, bedensel, konuşma, davranış ve öz bakım gibi alanlarda sorun yaşayan bireylere yönelik kurulmuş ve bu doğrultuda hizmet veren bir özel eğitim ve rehabilitasyon kurumudur. Normal yaşamın gereklerine uyamama durumunda olan bireylerin fonksiyon kayıplarını gidermek ve onlara toplum içinde kendi kendilerine yeterli olmalarını sağlayıcı beceriler kazandırmak temel amacımızdır. Ayrıca, özel eğitim ve rehabilitasyon hizmetlerine ihtiyaç duyan bireyler ve ailelerine rehberlik etmek ve alana yönelik araştırmalar yaparak sağlıklı bilgiler edinmek de amaçlarımız arasında yer almaktadır. Eğitim merkezimiz de çalışan tüm personel birbiriyle iş birliği içinde olduğu gibi, merkezimizde hizmet verdiğimiz bireyler ve ailelerle de iş birliği içindeyiz. Aile danışmanlığı hizmetimiz ile ailelerimizin zorlu süreçlerinde her daim yanında olmakla birlikte	sahip	oldukları yasal haklarla ilgili bilgilendirmeler yapmaktayız.Günümüz şartlarına uygun nitelik ve kalitede hizmet vermek amacını ilke edinmiş olan merkezimiz, hedeflediği hizmet kalitesini sunmak için; mevcut rezerv kapasitesi, fiziksel donanımı, tecrübeli uzman kadrosu ve özellikle ileriye yönelik kalıcı bilimsel plan, program ve çalışmaları ile hizmetlerini yürütmektedir.",
  "   Çocuklarımız için, geleceğimiz için, birlikte başarmak için; merkezimizi bizzat gelip görmeniz ve sizinle tanışmamız bizleri mutlu edecektir. Çocuğunuzun geleceği için bizlere bir saat zamanınızı ayırmanız demek, belki de onun yaşamında çok şeyin değişmesi demektir. İnanın bizimle görüştükten sonra daha önce neleri kaybettiğinizi ve bundan sonra neleri kazanacağınızı anlayacaksınız. Hizmetlerini deneyimli ve konusunda uzman kadrosuyla kat kat fazlasıyla sunan merkezimiz, yılların tecrübesiyle sizin her zaman yanınızda.",
];

const aboutPrograms = [
  "Zihinsel Engelli Bireyler Destek Eğitim Programı",
  "Yaygın Gelişimsel Bozukluklar Destek Eğitim Programı",
  "İşitme Engelli Bireyler Destek Eğitim Programı",
  "Bedensel Engelli Bireyler Destek Eğitim Programı",
];
const contactContent = "";

const employeeContent = "";

posts = [
  {
    title: "asdasdasda",
    image: "images/Mustafa_Kemal_Atatürk.jpg",
    content:
      "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.",
  },
];

stuffs = [];

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/stuffDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const stuffSchema = {
  name: String,
  department: String,
};

const Stuff = mongoose.model("Stuff", stuffSchema);

const stuff = new Stuff({
  name: "Egehan Karaköse",
  department: "Developer",
});
//stuff.save();

// Stuff.find(function (err, stuff) {
//   if (err) {
//     console.log(err);
//   } else {
//     // console.log(fruits);
//     mongoose.connection.close();
//     stuff.forEach(function (stuff) {
//       console.log(stuff._id);
//     });
//   }
// });

app.get("/", function (req, res) {
  res.render("home", {
    content: homeStartingContent,
    posts: posts,
  });
});

app.get("/contact", function (req, res) {
  res.render("contact", { content: contactContent });
});

app.get("/about", function (req, res) {
  res.render("about", { content: aboutContent, programs: aboutPrograms });
});

app
  .route("/employee")
  .get(function (req, res) {
  Stuff.find({}, function (err, stuffs) {
    res.render( "employee",{
      foundStuff: stuffs
    });
  });
});

app.get("/activities", function (req, res) {
  res.render("activities", { content: aboutContent });
});
app.get("/mission", function (req, res) {
  res.render("mission", { content: aboutContent });
});
app.get("/vision", function (req, res) {
  res.render("vision", { content: aboutContent });
});
app.get("/service", function (req, res) {
  res.render("service", { content: aboutContent });
});

app.get("/zihinsel", function (req, res) {
  res.render("zihinsel", { });
});

app.get("/yaygin", function (req, res) {
  res.render("yaygin", {  });
});



app.listen(3000, function () {
  console.log("Server started on port 3000");
});
