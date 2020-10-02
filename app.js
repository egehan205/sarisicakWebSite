//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const { forEach } = require("lodash");

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
  "Özgül Öğrenme Güçlüğü Destek Eğitim Programı",
];
const contactContent = "";

const employeeContent = "";

posts = [
  {
    title: "Zihinsel Engelli Bireyler Destek Eğitim Programı",
    image: "images/egitim-down-sendromu.jpg",
    tag: "zihinsel",
    content:
      "Eğitim, önceden belirlenmiş amaçlara göre insanların davranışlarında belli gelişmeler sağlamaya yarayan planlı etkinliklerdir. Ayrıca eğitim, bireylerin toplumun normlarını, standartlarını ve yaşama yollarını kazanmasında etkili olan tüm sosyal süreçlerdir. Bireyin yaşadığı toplum içinde değeri olan yetenek ve diğer davranış biçimleri geliştirdiği süreçlerin tamamı eğitim aracılığıyla edinilir. Tüm bireyler gibi zihinsel yetersizliği olan bireylerin de aynı aşamalardan geçmeleri söz konusudur. Ancak zihinsel yetersizliği olan bireylerin tüm bu aşamalarda yaşıtlarından daha farklı süreçlerden geçtiği bilinmektedir.Özel eğitime gereksinimi olan bireylerin eğitim ve sosyal ihtiyaçlarını karşılamak için özel olarak yetiştirilmiş personel, geliştirilmiş eğitim programları ve yöntemleri, bu bireylerin tüm gelişim alanlarındaki özellikleri ile akademik disiplin alanlarındaki yeterliliklerine dayalı olarak uygun ortamlarda sürdürülen eğitim özel eğitimdir.",
  },

  {
    title: "Yaygın Gelişimsel Bozukluklar Destek Eğitim Programı",
    image: "images/ogrenmegüclügü.jpg",
    tag: "yaygin",
    content:
      "Bireylerin, var olan yeterliklerinin en üst düzeyde geliştirilerek sosyal yaşama etkin katılımının artırılmasının temel yolu eğitimdir. Özel eğitime ihtiyacı olan tüm bireylerde olduğu gibi yaygın gelişimsel bozukluğu (YGB) olan bireylerde de eğitim ve ev ortamları uygun şekilde yapılandırıldığında, işlevsel eğitim programları geliştirildiğinde, öğretim süreci bireysellik esasına göre hazırlandığında, bağımsız yaşam becerilerinin edinilmesi ve toplumsal entegrasyon bağlamında önemli ilerlemeler kaydedilmektedir. Yaygın gelişimsel bozukluğu olan bireylerin bağımsız yaşam becerilerini geliştirmeleri, davranış problemlerinin azaltılarak gereksinimleri olan beceriler kazanabilmeleri, uygun eğitim programlarıyla bütünleştirilmiş, yapılandırılmış ve zenginleştirilmiş öğretim ortamlarının erken yaştan itibaren sağlanmasıyla doğrudan ilişkilidir. Yaygın gelişimsel bozukluk gösteren bireylerin, tanı aldıkları ilk andan itibaren destek eğitim programlarına alınarak gelişimlerinin desteklenmeleri gerekmektedir. Bireyin örgün eğitime dâhil olduktan sonra da düzeyine/tanısına uygun destek eğitim programlarına katılması, gelişiminin en üst düzeyde desteklenmesini sağlayacaktır.",
  },

  {
    title: "İşitme Engelli Bireyler Destek Eğitim Programı",
    image: "images/isitme2.jpg",
    tag: "isitme",
    content:
      "Doğuştan olan ya da yaşamın ilk yıllarında başlayan işitme kayıpları bireyin konuşmayı anlama, ana dilini edinme ve bilişsel becerilerinin gelişimi üzerinde olumsuz etkiler yaratmaktadır. İşitme engelli bireyler, dili edinebilme, sesli uyaranları normal ortamlarda algılayarak o uyaranlara uygun tepkide bulunabilme becerilerini geliştirebilmek için özel eğitime ihtiyaç duymaktadır. Günümüzde işitme kaybı tanısı birçok bireye küçük yaşlarda hatta doğumda konulabilmekte, işitme cihazları ile daha iyi işitmeleri sağlanabilmektedir.Bireyin özel eğitim, aile eğitimi ve destek eğitim ile konuşmayı algılaması ve konuşmayı öğrenmesi, bu yolla iletişim kurması, işitme kaybının derecesine ve sağlanan erken eğitim hizmetlerinin etkinliğine bağlı olarak çeşitli düzeylerde mümkün olabilmektedir.",
  },

  {
    title: "Bedensel Engelli Bireyler Destek Eğitim Programı",
    image: "images/bedensel.jpg",
    tag: "bedensel",
    content:
      "Eğitim, bireyin davranışlarında kendi yaşantısı yoluyla istenilen yönde değişim oluşturma sürecidir. Bireyin ihtiyaçlarının karşılanmasında birincil etken bireyin gereksinimi olan eğitimin sağlanabilmesidir. Her birey gibi özel eğitime ihtiyacı olan bireylerin de kendine özgü özellikleri, ilgi, yetenek ve öğrenme ihtiyaçları bulunmaktadır. Çağdaş eğitim anlayışı gereği, özel eğitime ihtiyacı olan bireylerin bu özellik ve ihtiyaç çeşitliliği dikkate alınarak “bireyi merkez alan” eğitim modeliyle öğrenimlerini sürdürmeleri en doğal haklarıdır. Bedensel engelli bireylerin genel özelliklerinin çok geniş bir yelpazede çeşitlilik göstermesi, yaşam kalitelerinin arttırılması ve belli bir düzeyde tutulması gereğinden hareketle Bedensel Engelli Bireyler Destek Eğitim Programına duyulan ihtiyacın önemi ortaya çıkmaktadır.",
  },

  {
    title: "Özgül Öğrenme Güçlüğü Destek Eğitim Programı",
    image: "images/ogrenme2.jpg",
    tag: "ozgul",
    content:
      "Eğitim, bireyin davranışlarında kendi yaşantısı yoluyla istenilen önde değişim oluşturma sürecidir. Bireyin ihtiyaçlarının karşılanmasında birincil etken, bireyin gereksinimi olan eğitimin sağlanabilmesidir. Her birey gibi özel eğitime ihtiyacı olan bireylerin de kendilerine özgü özellikleri, ilgileri, yetenekleri, öğrenme ihtiyaçları ve hakları bulunmaktadır. Çağdaş eğitim anlayışı gereği, özel eğitime ihtiyacı olan bireylerin bu özellik ve ihtiyaç çeşitliliği dikkate alınarak “bireyi merkez alan” eğitim modeliyle öğrenimlerini sürdürmeleri en doğal haklarıdır. Özel öğrenme güçlüğü olan bireyler dili yazılı ya da sözlü anlama ve kullanabilme için gerekli olan bilgi alma süreçlerinin birinde veya birkaçında sorun yaşarlar.Özel öğrenme güçlüğünün bireyin dinleme, konuşma, okuma, yazma, heceleme, dikkat yoğunlaştırma, matematik, akıl yürütme, motor ve organizasyon becerilerini olumsuz etkileyen yapısal bir sorun olması nedeniyle, bu güçlüğü olan bireyler örgün eğitim programlarında zekâ düzeyine ve yaşıtlarına oranla düşük başarı göstermektedir..",
  },
];

stuffs = [];

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect(
  "mongodb+srv://admin-egehan:egehan205@cluster0.ofoxv.mongodb.net/stuffDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// mongoose.connect("mongodb://localhost:27017/stuffDB", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

const stuffSchema = {
  name: String,
  department: String,
  rank: Number,
};

const imagesSchema = {
  name: String,
};
const gallerySchema = {
  name: String,
  images: [imagesSchema],
};

const Stuff = mongoose.model("Stuff", stuffSchema);
const Image = mongoose.model("Image", imagesSchema);
const Gallery = mongoose.model("Gallery", gallerySchema);

// var items = [];

// names.forEach(function (name) {
//   const image = new Image({
//     name: name,
//   });
//   items.push(image);
// });

// const gallery = new Gallery({
//   name: "Gezilerimiz",
//   images: items,
// });
// gallery.save();

// const stuff = new Stuff({
//   name: "Simge Tepe",
//   department: "adasdasdasd",
//   rank: 1,
// });

// stuff.save();

// Stuff.find(function (err, stuff) {
//   if (err) {
//     console.log(err);
//   } else {

//     mongoose.connection.close();
//     stuff.forEach(function (stuff) {
//       console.log(stuff.name + " " + stuff._id);
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

app.route("/employee").get(function (req, res) {
  Stuff.find({}, function (err, stuffs) {
    var rank0 = [];
    var rank1 = [];
    var rank2 = [];
    var rank3 = [];
    stuffs.forEach(function (stuff) {
      switch (stuff.rank) {
        case 0:
          rank0.push(stuff);
          break;
        case 1:
          rank1.push(stuff);
          break;
        case 2:
          rank2.push(stuff);
          break;
        case 3:
          rank3.push(stuff);
          break;
        default:
          break;
      }
    });
    res.render("employee", {
      foundStuff: [rank0, rank1, rank2, rank3],
    });
  });
});

app.get("/activities", function (req, res) {
  Gallery.find({}, function (err, galleries) {
    var gallery = [];
    galleries.forEach(function (gal) {
      gallery.push(gal);
    });
    gallery = gallery.sort(function (a, b) {
      var nameA = a.name.toLowerCase(),
        nameB = b.name.toLowerCase();
      if (nameA > nameB)
        //sort string ascending
        return -1;
      if (nameA < nameB) return 1;
      return 0; //default return value (no sorting)
    });

    res.render("activities", { gallery: gallery });
  });
});
app.get("/mission", function (req, res) {
  res.render("mission", { content: aboutContent });
});
app.get("/vision", function (req, res) {
  res.render("vision", { content: aboutContent });
});

app.get("/zihinsel", function (req, res) {
  res.render("zihinsel", {});
});

app.get("/yaygin", function (req, res) {
  res.render("yaygin", {});
});

app.get("/isitme", function (req, res) {
  res.render("isitme", {});
});

app.get("/bedensel", function (req, res) {
  res.render("bedensel", {});
});

app.get("/ozgul", function (req, res) {
  res.render("ozgul", {});
});

app.get("/activity/:activityName", function (req, res) {
  const activityName = req.params.activityName;
  Gallery.findOne({ name: activityName }, function (err, foundList) {
    if (!err) {
      if (!foundList) {
      } else {
        res.render("activity", {
          name: foundList.name,
          images: foundList.images,
        });
      }
    }
  });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function () {
  console.log("Server has started successfully");
});
