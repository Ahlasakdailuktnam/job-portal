import { PiReadCvLogoBold, PiBagFill,PiCertificateFill, PiFireSimpleFill,PiGraduationCapFill} from "react-icons/pi";
import { MdFindInPage } from "react-icons/md";

const features = [
  {
    title: "ស្វែងរកការងារបានលឿន",
    description:
      "ជាមួយបណ្តាញក្រុមហ៊ុនធំៗ និងឱកាសការងារច្រើន អ្នកអាចរកការងារដែលអ្នកស្រលាញ់បានយ៉ាងងាយស្រួលក្នុងរយៈពេលខ្លី។",
    icon: <MdFindInPage />,
  },
  {
    title: "បង្កើត CV ដោយឥតគិតថ្លៃ",
    description:
      "គ្រាន់តែបំពេញព័ត៌មានរបស់អ្នក អ្នកអាចបង្កើត និងទាញយក CV Template ស្អាតៗបានដោយឥតគិតថ្លៃ។",
    icon: <PiReadCvLogoBold />,
  },
  {
    title: "បង្ហោះ Resume ដោយឥតគិតថ្លៃ",
    description:
      "បង្ហាញបទពិសោធន៍ និងសមត្ថភាពរបស់អ្នក ដើម្បីឲ្យក្រុមហ៊ុនធំៗអាចស្វែងរក និងទាក់ទងអ្នកបាន។",
    icon: <PiBagFill/>,
  },
  {
    title: "វគ្គបណ្តុះបណ្តាលអនឡាញឥតគិតថ្លៃ",
    description:
      "រៀនជំនាញថ្មីៗពីមជ្ឈមណ្ឌលបណ្តុះបណ្តាលល្អៗ ដែលជួយអភិវឌ្ឍទាំង Soft Skill និង Hard Skill របស់អ្នក។",
    icon: <PiGraduationCapFill/>,
  },
  {
    title: "តេស្តជំនាញ និងទទួល Certificate",
    description:
      "ធ្វើតេស្តវាស់សមត្ថភាពដោយឥតគិតថ្លៃ ហើយទទួលបាន Certificate ដើម្បីបន្ថែមភាពជឿជាក់ក្នុងការដាក់ពាក្យការងារ។",
    icon: <PiCertificateFill/>,
  },
  {
    title: "ស្វែងរកការងារឥឡូវនេះ",
    description:
      "ចាប់ផ្តើមដំណើរអាជីពថ្មីរបស់អ្នកជាមួយឱកាសការងារល្អៗជាច្រើននៅលើ Srolanh Career។",
    icon: <PiFireSimpleFill/>,
  },
];

const WhyChooseUs = () => {
  return (
    <section className="w-full py-20 px-6 md:px-16 relative overflow-hidden">
      {/* BACKGROUND GRID */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-[#5B4CF0] font-semibold uppercase tracking-widest text-sm">
            WHY CHOOSE US
          </p>

          <h2 className="mt-4 text-3xl md:text-5xl font-black text-black leading-tight">
            មូលហេតុដែលអ្នកគួរជ្រើសរើស
            <br />
            Srolanh Career
          </h2>

          <p className="mt-5 text-gray-500 leading-relaxed text-sm md:text-base">
            យើងជួយអ្នកស្វែងរកការងារ បង្កើត CV និងអភិវឌ្ឍជំនាញ
            ដើម្បីឲ្យអ្នកទទួលបានឱកាសការងារល្អបំផុត។
          </p>
        </div>

        {/* FEATURES */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* ICON */}
              <div className="w-16 h-16 rounded-2xl bg-[#5B4CF0]/10 flex items-center justify-center text-3xl">
                {feature.icon}
              </div>

              {/* TITLE */}
              <h3 className="mt-6 text-xl font-bold text-black leading-snug">
                {feature.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="mt-4 text-gray-500 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
