const express = require("express");
const data = require("./data/data.json");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const fs = require("fs");
const nodemailer = require("nodemailer");


const today = new Date();

const monthAndDateNormilizer = n => {
	const monthNormilizer = (increment) => {
		let m = today.getMonth();
		if(increment) {
			if(m == 11) {
				m = 0;
			}
			else {
				m++;
			}
		}
		if (m < 9) {
			const n = m + 1;
			return (m =`0${n}`);
		} else if (m >= 9) {
			m += 1;
			return (`${m}`);
		}
	};

	const dayNormilizer = n => {
		let d = today.getDate();
		let f = d + n;

		if(f > 28) {
			let month = monthNormilizer();
			if( month == "01" ||
					month == "03" ||
					month == "05" ||
					month == "07" ||
					month == "08" ||
					month == "10" ||
					month == "12") {
				d = f - 31;

				if(f == 29 || f == 30 || f == 31) {
					d = f;
					return (`${monthNormilizer()}-${d}`);
				}

				if(d < 10) {
					d = `0${d}`;
				}
				return (`${monthNormilizer(true)}-${d}`);
			}

			if(	month == "04" ||
					month == "06" ||
					month == "09" ||
					month == "11") {
				d = f - 30;

				if(f == 29 || f == 30) {
					d = f;
					return (`${monthNormilizer()}-${d}`);
				}

				if(d < 10) {
					d = `0${d}`;
				}
				return (`${monthNormilizer(true)}-${d}`);
			}

			if(month == "02") {
				d = f - 28;
				if(d < 10) {
					d = `0${d}`;
				}
				return (`${monthNormilizer(true)}-${d}`);
			}
		}

		else if(f <= 28) {
			if(f < 10) {
				f = `0${f}`;
			}
			return (`${monthNormilizer()}-${f}`);
		}
	};

	return dayNormilizer(n);
};


const currentDate = `${today.getFullYear()}-${monthAndDateNormilizer(0)}`;
const threeDaysAfterCurrentDate = `${today.getFullYear()}-${monthAndDateNormilizer(3)}`;
const sevenDaysAfterCurrentDate = `${today.getFullYear()}-${monthAndDateNormilizer(7)}`;

//Availiable cars on app launch date
data.cars[0].startDate = `${currentDate}`;
data.cars[1].startDate = `${currentDate}`;
data.cars[2].startDate = `${currentDate}`;
data.cars[3].startDate = `${currentDate}`;
data.cars[4].startDate = `${currentDate}`;
data.cars[5].startDate = `${currentDate}`;

//Availiable cars 3 days after app launch date
data.cars[12].startDate = `${threeDaysAfterCurrentDate}`;
data.cars[13].startDate = `${threeDaysAfterCurrentDate}`;
data.cars[14].startDate = `${threeDaysAfterCurrentDate}`;
data.cars[15].startDate = `${threeDaysAfterCurrentDate}`;
data.cars[16].startDate = `${threeDaysAfterCurrentDate}`;
data.cars[17].startDate = `${threeDaysAfterCurrentDate}`;

// //Availiable cars a week after app launch date
data.cars[6].startDate = `${sevenDaysAfterCurrentDate}`;
data.cars[7].startDate = `${sevenDaysAfterCurrentDate}`;
data.cars[8].startDate = `${sevenDaysAfterCurrentDate}`;
data.cars[9].startDate = `${sevenDaysAfterCurrentDate}`;
data.cars[10].startDate = `${sevenDaysAfterCurrentDate}`;
data.cars[11].startDate = `${sevenDaysAfterCurrentDate}`;

fs.writeFile("./data/data.json", JSON.stringify(data, null, 2), function (err) {
	if (err) return console.warn(err);
	console.warn(JSON.stringify(data, null, 2));
});

const app = express();

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers");
	res.header("Content-Type: text/javascript");
	next();
});

app.use(express.static("data"));

app.get("/car/:id", (req, res) => {
	const sendCar = data.cars[req.params.id];
	res.send(sendCar);
});

app.get("/search", (req, res) => {
	const newSearch = { cars: [] };
	newSearch.cars = data.cars.filter( (car) => { return (car.city == req.query.city && car.startDate == req.query.startDate); } );
	res.send(newSearch);
	console.warn(req.query);
});

app.post("/selectedCity", urlencodedParser, function (request, response) {
	if(!request.body) return response.sendStatus(400);
	response.send(` Выбран город ${request.body.userName}`);
});
//Отправка на почту
app.get("/orderConfirm", (req, res) => {
	// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
	nodemailer.createTestAccount((err, account) => {
		// create reusable transporter object using the default SMTP transport
		let transporter = nodemailer.createTransport({
			host: "smtp.gmail.com",
			port: 587,
			secure: false, // upgrade later with STARTTLS
			auth: {
				user: "carbookingrentalservice@gmail.com",
				pass: "4815162342Wet"
			}
		});

		const carURL = {
			CarPicURL: ""
		};



		(function(car) {

			switch(car) {
			case "bmw.jpg": carURL.CarPicURL = "https://lh3.googleusercontent.com/ZkQcQaieLkUf0MQGsxs5DCXZzP8Pbhi84HEqb4SapEAxDI_RvfTJRXxwaHR4nCkwQYPW3oBtN_0rdbqOmHY-OlvZ4C1cYHkHi0ZYvEuWYwdELkQGCVCZVoaJyDUcXWnWejwqxVEUQ-3I1_Zpvik5bgXn2P-3pOOiA1PUmBhPBfhigxZB1zCpdUW6lGkNx5y_jBfK4j-gcw5vapRFigGi3E57RzW9Qt1669QdAokC2jvRwXZHtzIYV77fV3cR8vrFKb81Bn7jCFTrncqhDHSOqNbLTHumfeno1Q_plGj1Zs1kHFNIhyL-wI0asJqNTAns78U7BOlu5ORPSewSqqG-PIS5xyXQF15uznIbRRkPbOAnm8kXOMgzLgFAV0zygXcbYCKjtDEVVJLz6iuClv94RayeaCxGcA8tO-lg0u5bii5PXoLHQDeMCbUt6EP4G2mZvLa48jK5vq-MW-OAdXiCdNKsZWpYBni-a3eUW_W4zN66Pm18E-doBDdnnl4mZvizCU7s93uHPGvk8qBtwBe1G_YD6tQalKG2wid_apZFfNsGOWTXE4B2cr5EAHXB0P5atHEESfXSEgd3ytN2WeBZWQvHj1lnLLRqIr4C_g=w640-h360-no";
				break;

			case "honda.jpg": carURL.CarPicURL = "https://lh3.googleusercontent.com/NI02RIYWJf2kRHEW3Y8AQN9OxEgEIJaaqEAcFAAKr9lIBPDamroneSIVF9D4RYOCaFl5oVY0tun6krHjP6rNixinwXgJ4Efjru19PIVPvWt0mmTiltCUanl6tdbRib_G5dovxTVPiemBjHGPdyGQ_cy4Ntfl_yR3LkepnMylG584mT8LCRKYElPoxQWPGLKjh31jNE0FZSHauWKRr8voknN7JiSuvlqml-juNi9CvKs4l0l-lssKyhxnKvYj_JwfByqB_LVdylNQN9L5wW7YOz365s9B3_De5z8bJDwKzVlsaPXEUN6JnhFydgOEjVkmBcdyrdQnjlypFMenM4eRsJx-G18sXKfGg2o9n_qa7YH5btcc8fjWoba7-UJ627pcLkOeeLAzvYGVpUzqayv2KDVhIK85usYq9HEq2ANqv8GKvoer8yK3qsmSWYC6y_9DGjHeKFgoI8l1-qQ0Zaw0EhyOBBd7C-3OTNG4Q3kjUMFC5zFDPRAeYNRCVQ4IGHXapIUzpCGmR6FSGPnZS-taC1tQV7Nw_LEwRLyuqUdMz10MXBkJ-HlquOazPVaybdleAmet97tOOJUJS5pqdwssaZTEZJ4qLcoPZxcZ_A=w640-h360-no";
				break;

			case "skoda.jpg": carURL.CarPicURL = "https://lh3.googleusercontent.com/DKe02FWhXHSUhGjN_HOUa4zGvs2E5Zgsh7H7DjHc2njejrq_YHU7tNgLQWJmPhUTtN2675w8KZzD8N8Y58JWX1epIRX6w_zrDuIKXa4lEwRPUBAw83VzrnskapNpsg8OLMg5XXZLiKRQYysfJhaOEPVSAVVOUTmeULErVqObg37RlARlIX2elVHMlwb0vlH_99oZPHPLe0caZGsz19M-gnZTtSrmUiHoWwWHr15YCThQvJXZvFGz34WnXpU9RpvV4NRcs4OOB5v7ncSjGNIlT1itLLva1u5N-4mp3CDp9BT9-f8wvZC4giJYPJSGwze3vuw_NsdKrKYGa-lxvHVXO9XvgCLLUsFYTpiK_52qfw4C92k8bpP1iIcDxwl03x7B1B7eYokfy75a9NPK5RfwISTc97o47HPQ8aqUsVzyOBiG7pEEmGiBjuV0xpZwMhkf1J8tD2YmzF5_mZ27RRV1JGFvHRD4GsPOg2_en_TBU1YLkgFJr_AIzvwGYD6UO55seFe7bO1HHuFQxucn0LsnTsvKVKmX0AUavxPMTDsXVqaLpxsoxWmLUTivPwCoTyngBigyL7lZ2pEyx3zdmcz4i_23vdLk7KMVLS9htw=w640-h360-no";
				break;

			case "tesla_model_s.jpg": carURL.CarPicURL = "https://lh3.googleusercontent.com/iDfIABITXrhlCC_cFW8g5sAn0fpAjtmtwNN4OkJ0KKVmeoJ9d7TYchh-gefhdSe2lzdBco02BgHqGDBNXlnhY_CMJvixEJdZsdrqJ2HXKOJ9r_kXdX5sVatpZXEH4iVqBdWe5Omh4ilVNQJrwhCaLBXbngfnOR1ZdxXSqxS3ARs35S4jQIUdalT4BKPI_uzKb377ZN6ERewPTPFzBEHQ5dLakEGyB0OBYIlM4iebPhEX0HPOOrgFd6Ffuti-AcEqdmKM9UZ3_S40PLfGpkxPXbIemw-3q3jvaSGrHg3sbd9QAcGtXgec4t2glHuXQVP2VZT5wt_mpPMF1oJdN0YS-InU77Zp_rV-D6nRapZ-wmnsETfHgxncYXy8QDBHosbtI7giXxRiLG1hiwUzngCzJnrwGu2d8g3i3u7BFrJYaWSruTE2baX99cp22Nz7WG6yGAsx706fb96SFWEkFz4qJu8D3TxUFRimPVduKpQggkMmtv_3aqSgqiPN9QvtI6agUs1hKDNRNW7RkxfWtyC86O8ugvh0D8-VuM-n9hqxr6TakAxbaaRVJyrZsAC50PlKZgglPU4HnSVcNCm_Zd1tBD0MLjXz5jEpgJLOJg=w640-h360-no";
				break;

			case "tesla_model_3.jpg": carURL.CarPicURL = "https://lh3.googleusercontent.com/Y56aTg9J1QdnvrJdRdw4z6TE4YcojC8Qs-TRE_TP9yJ3jnhWH0lG7h62v9yAzbK70ggpJG_4tECzPLVVmqV0_2MV5mRDi2lt5977npof-Z3-q8tkxlzsZRXzJx96FbX-3ZtHH2bFIhvv1O9mm-HtjH2P0TRg80TW_LdUcvXGwPHrPvJOai33A74T3WcqDFY44uQaJxCL9JZt2PBYc3eGHd6q91t-c8MZN7-xisQ52_zsyjEiJRaZH6FXtX33y27LRWoHmofU84vt4RwUH-_wygt0joR6HbNFt2KLvOGOk-Y_eyWnigJgeRjcNHPHvr57ETUjex2dfunwq592OCfqptGKPR5Vl3rZg-41t4U0sKywH6vKlxtbES2_mSQkVCL8x2vvMlrPJsc3Df3iyZDgL3kPgK3rDdHDqocbbP88cFPcWCa5m_vAWMLgp8mm0Wyxh-9yFIEn2I74Ur_rx4tdjM-4EdPa311Q1Tskcf1HWXGxNcaFod526_nk88Swf302oNzAuQZm9LSku7wizCoVCqKZ8h6ZfDiYGPRFTdEEbVEfrC49LsWwBAuThJy8V24bdsDqZRNUZZ7uDEEveA_u3DIe4_eCuj2sMGv_xA=w640-h360-no";
				break;

			case "tesla_model_x.jpg": carURL.CarPicURL = "https://lh3.googleusercontent.com/_XKfGCViz3NFQByBByRpyZj6-7KLmXWQc2PBSs-Kl0o3_fWwv19buLGi3F2mY8WAQwMwA_URWDcC7D2QsaQFcY21t6V78iPxaFikAT2pbi_fPAzNjWJ_4VMTKo4dJ4MXYvbTZ7CvaMwhqBNKDxyoQe7zyX_6vskWtC_IpcSLRvKqEHRZQ0TBBAWqOUh2QoikgrsKT6h3KFBk96LemYD48f_Q9DTEhgrjHkLRbANvm56kHWFBfSRRKZPascKSZiXbLGGUrS6oeXPirSHrGLYDN0zc6--Q94BUVYjVRqC9-qHq9J5t1O0q0Xe369b_Gpf8kDVZSExkhcDrOX-UobvHtscuLmQ0oqWmMaVxGXQTHVsG5EiQT_5yayNzN1D-i-O4jUOqgmDf8j20oc5rpCidkLdn-sUnM7zTnXtDoTCSiKaxkNujsrLE6jy0gLf2d2sJxq9tVo_KR-7bRYBc3NJ-VfwtbaUdoc4TvXocJHcnvYXwwRMwZMh_0UBQjDtiB0z3r3ChUpzNRYZOV7jt4qg2dU9ZzIgDryLvs3YemX3oW1Jf7vMTKrPzOhbQO3vu9DLX_KqySIXTXx1skgLftRYRfrpDP6fXMZsyJr3Raw=w640-h360-no";
				break;

			case "opel.jpg": carURL.CarPicURL = "https://lh3.googleusercontent.com/fVnMAS4NrDPkNoWvzPURmY5UjA1MIrVOuGkhXzY3kUX3XqLG-F1bNqrTXV_lCLRmfrkeICgFagNs_GFPR00UzGxnJVPkCle41k7nueLNMwMXFiSBTEhCCNknsil8uWxN3MI-7Czn4yJxLJyGekRI_ATNCsCCBzCSSi-KSjaqbJFOBnWjn70wj2X5Tvf7FLefc-hXmTYRG1rSDOGJc3-C2pdWOzx4UcztIcl1vnb-419wJf6uq4myjESWfNp_FzMtsZR9cWVfMY5mITo5xQKpve-GQHdS7gDUGZu0GC6l_Nz1qH2ghBddgDWPN9-FRqycT1bYoh_cG1yw9W3KOKH9Lb9GomScsJMmL3O825_lPsN7qYD-w8_J3PKNeMu3ELitaIrmrUqj3nvoSfZzQFqulDv-1-UGUmZQpt6r27A3AtlRf8RQHSuT2tSyQmfCkzQR0mwRDHWUB6viBBPBg5ePb1N01M1PyiXdpFkqNIIMRBwbxHbBgdmd4o58aGXt54BGlR1Cqn3GOTHPx5xRxEKiwItin8NKvOZY94GfOXoDcpA7NK7MycO47GtZrgB-S4o9ToF0mwwbmuXZbLzHnP1fl6dV-IxEZVjuL1mT8g=w640-h360-no";
				break;

			case "vw.jpg": carURL.CarPicURL = "https://lh3.googleusercontent.com/vCFw58bm63dcsYhCyIy2KkEDinN2c2sDo0SvyBXju8pGd_VeEgkiuqqC7NjYruoKDWxO642KgKhZJsAl8K7X8tNltNqYxJfAxTC3gMqg6cHZTJnOFRvRHIevCqZzPAgZXDrpktsO8lPjTTLSR8URGhRJ-H3o0k0erHM-TDD9gpvDl55aZrIevtGBmAvBHdqqB80aFBmLi82kvlkaOJudSNnwhhMRFZcGHPb-tPZNkyu8gQvlxZQ5wsbFI70cweCOvWenQNCUf7eDGgDVWWfwRrRGQfHlaVErNH89nWtI8uQ2J8e6GU6SCXToj2o1xtjvKo7IqYuIbCVOFhLDuEskC11ffTpbHurFWnhiVvkcmqGsgnaQJtCmT9MJzxmZTrTQqXuN2U2sdjXgVa3SzFjDqxc7lJ6yw3afAo2qakOZiFzRy9F1J3eruXL730OgmBkQkbYGx4SU-71MCuSI9CAmpkIf8NK6985XMDWNb4wHCBuJv0oTzrJUC_9bjjH7hiujDsU7bpvggFSbrxsPl0gUFf4wdtKUWglPnIQ_2BnF6ZZCaJH_qcpOJaxrJ-wc5glCs8yvs4NKsU10RLK16n7K35azPWs_05vhVOr_tw=w640-h360-no";
				break;

			case "ferrari.jpg": carURL.CarPicURL = "https://lh3.googleusercontent.com/qcbXOQiOxZrTEhyIt930xV5mE0wyJsU_LdMGZF8xIo63t420TpLzLo6zxqs3NWQFveVYxBY541DuqR0Q2IfDuALIQ2R6WO5OzO5-F71zK0ZGiZVAGU4vVcWzPTEzD2z7LiOTTCgecE3OaIKJsUMMhQlCNljJfxsHZm_rdouEnjJR0rWq95E4nPO_rEbKpX1vgOT56DtAeEFQYWmHRxd9M_u6l9dH7uumAMYurQZIl1PFFlOL6H_8xf6UMztjmv1Jo6NsDcMbRl53dAAzQ8XIk7X8naeXybDam8DppoMLKyuo3N8buBWKPJ8WiEYIcsi2durREOa2PdDXAJtuNbX17hFY-BmWNSOOskSeJ0i5p2AdFsorSoubknJPTU0__gCOFBr25AFJMMQnx54AkUGW5Sh8cJE_RaVIk0H8KAfM89cSPCGCjsN3iJZ1rIsyZmrg4tv-2mW_ALExGSFmk3w4eTRRm-F06WYqYyXuNELh6zBI87M09FTtjdKh4cmazCuzAUgHPWAxf-dUP0EAtc4fc3p3Qw6JGF2gQEjp6ZY6VQcqqUL8p0nuKCLg3FnrvbDfY7kD_YF3mKGM-qiZJGiymkWJa_z0H8G4V6y0vQ=w640-h360-no";
				break;

			case "mercedes.jpg": carURL.CarPicURL = "https://lh3.googleusercontent.com/FYR5T1GEjynebT-rsvFc8gfyjyvCo-uz5pCUkgxKqMV7AzdAxrFHG6wfJ5S_bA7VHexyBJ51RGL5umhnwiR-IAmpk8koVn_hWNQou0KO8tRPmCiKN80N86LXREv0dZSftArSyAudLGIKAa9EUym0uXz4e5LT-QdiZppnIvNu7umso_d3T_TlxSHnnUFEwQa3JtvKFpfGqp-k4ufi6wEaTXoBlb29pOgEZRAGQy46cKwABTwTTwewn02LLsNflWpL0qV2e435HjlAMjkey424a5b-wssW0b95g5LqNT2cW5ezHNmF-GStloyqZzlHSd83ZHkH_PRfCxe_124WpwbqwYuvKQlUSnD-gFLYncyNh7MPSsIPv5bfrbKNgrtXr3MY4ZzzNxPBpzhmKxqdz4da4gjJLX2aQs5sX0mNXNt32qGnnix6hDSxzSCpofvzWL-8qwZasC6_wBtK7JlW6O46ft31Cz5sCS_O6U0fdNdgnzKjKkylHDw5ge4kxSHirIeV3IWnqxf1fic-JvFE15pef6WvM7tEAg1Zpzr9NDF3aBEyGvnsUcg0eTIfBWZZlRKS0sH_HjBJZQAmOvMdWgADNkPYa5TKx7UD-sP7cg=w640-h360-no";
				break;

			case "infinity.jpg": carURL.CarPicURL = "https://lh3.googleusercontent.com/ulbkaMHvEAWPi-BFGIa9bGjG6oAZpsA9P9wR4dxNxsUbOB4n3rS3dUKrPK0f_yca_bgPXCKo0ThjHVlBx0RWUJTGZOQAMYE9fxfdOgGpRWf_mI4LJSopEwxSsW8ws6lSphFx-41uFaqeR4mFZWI_7OkkMldHvW00GKcd7eYLzZMkQAvByouTffWPYRBodh3btWa-pff5HSAH58Cj391zXyQ0QLbRg6chpGaTNhg3U4X1qvu_8oGQzuBtEDKgxJ_yI0O_WQz-T1D6mODXJL0y-mEjodtwV8ipYzwPm6t5R6PV7o94Nw82qVhGWDQqlrbkABIv6N4aAXPoYpxPyqbZ6hNFgzEyjaGl3BY6lHkFayttax7xri8I1X-b8Qo5Ca9H-gasR1HnWfEbrN88lFh2S31jmQNKrkTv9W17eUhauVpgVotkGcB2TKSoRtXfzvhseTLQlZFoVZnRrTay5aZgWTZeH4YPsJlO8yvsb59nAYVwVcN7TvEd9YdH3z9md2s7fBS_isau3XTBV9nKlZBkKFfxNS2JbTRoUu9cKwqVlcMBdxwYtQhje0QCaJ3Sc9USiFcmtE_SSEi8vqAj9DFwKJwlzhFp4CfvDpep9w=w640-h360-no";
				break;

			case "porsche.jpg": carURL.CarPicURL = "https://lh3.googleusercontent.com/Gq1aR_KG2ctHzO2ye3kMZflvFcqS-tXkWJ0zB9yN-BegoTCbkei3vgCQb9WNc0_LXmyNiMloodUXHWAhibBvpOfO6sot-lFSOgilk6-Tms-RR7-UyDh36TjSjmpK1RZJZtYWrJOzXroV1rgmYbxxTKruU_veq_aTMi0gXu0IOIml_fZO0cxVnVBRMqUHSoQMkO2ebFCo0OZSZh300fWGOCVtTFV1qoRFFu366UdvbBW8wc07AzYqCCSxTISRH7N_wY_eR6nF4GjBV8ervUB1RGHhqTa0TEptHwZHetZBdfLjnmEfoHioA-kDHFmpKRTwS8dwjWMb51FnpVp7vsve4_nOmPd8EKKfOnD1KIeZ5PpVVLsW1vFceoy2BRrpoHQ9pwIDcM2NDSbgsdeCVyAjBf9OjJiC9NZq0PPRMhExif7rBaSEP0Mpj6GFq0SRKckOj5Jw_8jFVQOJaamEHJJ66AcJNl6XkpBPQhMjcIkUZkSEHNHg2hqzWf9U6KKtcBkfiWz0x8garZNY9H6xLr-2GppEBWB0pBRp8xYyQsMv4gE_-izO9mAYw-4gCqAZ2X9fvBkElEXyccqTegZAQJ5fYWDdsub_oW3qCrmPiA=w640-h360-no";
				break;

			case "maybach.jpg": carURL.CarPicURL = "https://lh3.googleusercontent.com/aafRepaqZ6SCwCapGvgGZDeXbckve3afTUdGrr2iOWKSQphMm46PdMLAFvhrTQmhFFvXl0rmtE1mO1m0jyqwk-v7UFQD_2DZB3MpfCMXKehnFwgeNIS5U0rSCcnL4CVNKom1LoxRoOTgZ4KX9YzjtieH-aIsPBv413mDtEmmDtg_h1Y0DsK7Qcqbrk21k7TlluuUDP-g5UKEi1W_DVdN_BjfonE_IutfstQjiExt0QCWz2KmhzrXoUxEg7ySMuoFoqFkkcX6S_648AHX21SX09h8Euk2sCRJO9WBiNDchSjkeGkqkU7z2bHm8erwO2Wp7AsgZuu92CztgOeLQeQX5VSYJki43FLXVOkW2dl-wUWnQq8wo3diihV-HWLgJnkzYLt3saVmlVp2Kk3JC-1V34rGKdbBO1X1CgW9DwJHoIzbyJRsaUmtuFOP9l_onvg-ay_WRA8ysUwS-VY38iVxOg5KT2_pcoUQB-2sqz7OIo61F7izCkBdVeiXFCdYwKQGg1N21wYfRRhsaMHcPFKWe2q4ZhrUKsoYb_FDnviUNMoSy68G9aoQV8osFDGr7zCZafZoaMNWSgoLMM-Qyqd9XAuayHUxdw21jWj2SQ=w640-h360-no";
				break;

			case "audi_tt.jpg": carURL.CarPicURL = "https://lh3.googleusercontent.com/_2T0kpWedJMhDRM4Pss8HmC78ly9B2u4dDmap2lL1PN2Jolsi2jZ4KiLZTjISzgtcwoqdLm84hdRFseaepndakvvXeFiO3Z6tFw97QgXGPKjfOtOwCfgpijx1uG3mfDghly4vK95LGRrpbK4mzRCooNCI2bMuKeTuqjPI0UvgpeHXYV8ZiGw3Ev-3hGK2aPLCMkisku5KVNG2lVK3my7efr8W6Dc8JlvlG1f3OcG1beiT2vEO1yFPdHGUTD20z9qnjYOXSY38fxWQznawg0zCUufryXndpCLKSSM_uODuCJmhZ5gTXwUnoxm2jcZ7xDvLySVXjjba8UotgiJwiL-dEV05UzPCP4uIjJs4v3mvkEo4cMjvfH50gc2bE9la3mxMdBnlhY61NqjUnFJQdYnxQUYfaEqn44MFgCJtmFTIbaOz4ErNL-uJx3OYgLKe5wdL-ptms8DYOSrsyHUEpn0X_sdhpTUC1fVp52aog7r3_xEFSMje3zb1zNGxlMxGFx79tqSesP48NznHSaahIfx-QwyNii9Vu28J09Q6wSdKWLMS6A-wwRIJwulZl0zoebCM5gY6kbf83XZM-0qT0f8sDUiBQUr0hXceJiYtw=w640-h360-no";
				break;

			case "zhigul.jpg": carURL.CarPicURL = "https://lh3.googleusercontent.com/OodeBJ6q75Ndqw5gaIZyGXc2PiBrK0L8RXoA0oKJfbehoISe5eug_N2rZuv5sx58ROVQA6u8TJ9qS7Ia6OxEihpsOilYCYLHNRACXEyvOrY-GfXOatPaAhAxsDHfQHbUyxZ64WzBgP-TUorq26Adf-PBS4s9Q195MZe8yYyKecigOT33xpFBEqrk3J0lmX3IfVbFuwV3MoKcZae_mDVzT6308SvRMu5fNIoiElSK5pxmD_u3mR9MPAPod5TH-0jXWjUxmbWuXPOCRc92PWR3TVfZdjSjRvDVwFGPHLXqJNR_pLUj_N3w6g_U6DaqrurpqACkLOXzAzAcO-dsAUPfl3XdGDCN8mCuywoT7cr_YcB_lVWBTGG79i0X7Ipp77v1I6tbkhL6U2SVs8Aa2EPqX-SCL-RYigLh-twYCAAKEMquZqpFdXwI9T0dcQW_JS8RKWq8n9cmtel7pNA9XclxBw_7be9JFkkVkPZitCKV5UlMshn1Qp9dhofabNSKxU8kkouK2-xmpdCWNh_TbLM0KksY7jsI9tfDsn10xca00VZdQa5VLiNtLQb5VK6_CqcM-eK44ewUDWIx9ZOcDkHv2HxcPisvYUx0gr_HBQ=w649-h365-no";
				break;

			case "mercedes_s_class_2018.jpg": carURL.CarPicURL = "https://lh3.googleusercontent.com/6ACPrxRl9gftR6f_RRo0-Xuhxl8XXmpW-hnZ7aoIytOIb8QuYOkJ303bYuiMajwxGdPLj-0__TY9U1mNps3oJ--1eFQzBy8HYMsM-ieDZJwAay7Rez1Ha5TP56cF4l6bjUIl488XeUIso-812Kmr2nkA4eynr4dt5A4FiIVhdhWeJS7e9uTw_ekxSg9gy_lX8z_o1duBxkA9r688NRs3_iLuj30yKr2yBVmB1CWWlQbwLBCPnyeaufA_aak5zbnXDyU2aIfv4-QybSn4nMQQsTiGtIpwJ_IPxBtJ-KOHyG5bU1X3qQuolxpcBA9ehFsyfQKrbCGu_dCA151OGg8tk2VT27emvWYwGIfwBGuqnOPwG8VDALYLH6FgDobKANvq8qhnZaqEi3d2uPcLRgbJkKmNZbNnzZgsJyL6-Chy2EwUGSMAiF5c0bANSaRyQV0r4UpMiAaIHRvzBPiNFDwkjJFgI0_z5wTgeaIDxyd9Uh0KZAF2Yvzvg2bRHQXtZcAIs2WbwIKb214srK4wdsYXrwYrqQ-Nzdx3XYOFphOLWhA4ANyAApiYbxf4XpaxmAntIjHOgtPiMWCEMbywznLX6AK3zafq7nfFvD-ptA=w640-h360-no";
				break;

			case "mercedes_C_Class _Cabriolet.jpg": carURL.CarPicURL = "https://lh3.googleusercontent.com/DddidnqBMNhivli81KEQtqCj8u32iFy9Mt7NJvfY_2zpJcWcha4RKgJhVzE4PHsZiXfWzB7u1494IHFr0oizDmaxW0_Nia2kYUuXVSpr1kl0St74B4wD-is2jsc6Ff8xH6UOyDLT07SvP9PCMtdKnuqgpvCpdUaLEsHgtd6NRlI3d8DnQfs6Us-GnQcicRKmYHkfuOj9LXJWbE_c9i0M4KUQWJG2p41W5U1eD2JdV9AGuu89A6ZxemgKW8CpLqhbBnwzwpDW_nM-p1991lUoTttv8nagMpjrV73h8D38pyeTcMx77MMd66JNvq_2JZv0w3mIFfNwxFbRa8MiKO-r8On7phzzbfBSYkMyxBr1ehPJPu3m95_eNS_z-2PMn2g-CitFdkSBhyKW1kdZse-uY0rEN49Vb_FYkNhfU5UBFOJz-hFg5bQoYD-bC23PeipXcQflH2mA4Zmio08amBe9qU2K4MdWLRv2SJU8IaDHf3dEYfzyrzhksHzyc0F5KK9WOp5ifN_nBZZNaf6Lyq6YMEo0etBWds7CTw6Y2YSSFBqGDBK53nOcsOFuTv24B6fKVd_oUXDXvSR0cHcCOa1ehOM6bN6h5GMVXre2kw=w1410-h794-no";
				break;

			}
		})(req.query.poster);


		// setup email data with unicode symbols
		let mailOptions = {
			from: "carbookingrentalservice@gmail.com", // sender address
			to: `${req.query.email}`, // list of receivers
			subject: "Заказ авто на CarRental", // Subject line
			/*attachments: [
				{
					filename: `${req.query.poster}`,
					path: `../public/img/posters/${req.query.poster}`
				}],*/
			text: `Доброго времени суток, вы заказали ${req.query.auto} на сайте Car Finder. Ниже подробная информация о заказе. Спасибо что выбрали нас!`, // plain text body
			html: `
			<table cols="2" rules="rows" bgcolor="#f2f4f7" border="5" align='center' cellPadding="10" width="700">
				<caption>Доброго времени суток, вы заказали ${req.query.auto} на сайте Car Finder. Ниже подробная информация о заказе. Спасибо что выбрали нас!
				Информация о заказе:</caption>
				<tbody>
					<tr><td align="left">ИМЯ заказчика:</td><td>${req.query.username}</td></tr>
					<tr><td align="left">ФАМИЛИЯ заказчика:</td><td>${req.query.userLastName}</td></tr>
					<tr><td align="left">Email заказчика:</td><td>${req.query.email}</td></tr>
					<tr><td align="left">Начало брони:</td><td>${req.query.startDate}</td></tr>
					<tr><td align="left">Конец брони:</td><td>${req.query.endDate}</td></tr>
					<tr><td align="left">Город:</td><td>${req.query.city}</td></tr>
					<tr><td align="left">Автомобиль:</td><td>${req.query.auto}</td></tr>
					<tr><td align="left">Автомобиль:</td><td><img src=${carURL.CarPicURL} width="320" height="180"></img></td></tr>
				</tbody>
			</table>`
		};

		// send mail with defined transport object
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				return console.warn(error);
			}
			console.warn("Message sent: %s", info.messageId);
			// Preview only available when sending through an Ethereal account
			console.warn("Preview URL: %s", `${req.query.email}`);

			// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
			// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
		});
	});
	//res.send(sendCar);
});
//--

app.listen(3000, () =>
	console.warn("Server is running. Listening on port 3000")
);
console.warn("----------------------------------------------------");
