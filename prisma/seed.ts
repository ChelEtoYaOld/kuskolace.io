import "dotenv/config";
import { PrismaClient, Prisma, AccountUserRole, InstagramFeedMode, InstagramSyncStatus, OpeningDayKey, PastryCategory } from "../prisma-generated/client";
import { hashPassword } from "../src/@base/BaseActionFun";

const adminPassword = process.env.SEED_ADMIN_PASSWORD;
if (!adminPassword) throw new Error("Set SEED_ADMIN_PASSWORD before seeding the database");
const prisma = new PrismaClient();
type SeedEntity = Record<string, unknown>;
type RelationBinding = { target_entity_key: string; local_fields: readonly string[]; target_fields: readonly string[] };

const accountUserRecords = [
  { entityKey: "AccountUser:admin_kus_kolace", data: {
      id: "43982613-2fe8-4e3a-aa29-d09cb21862b0",
      createdAt: new Date("2026-10-12T10:00:00.000Z"),
      email: "admin@kuskolace.cz",
      fullName: "Správce Kus Koláče",
      passwordHash: hashPassword(adminPassword),
      phone: "+420608903828",
      role: AccountUserRole.ADMIN
    }, relations: [] },
] as const;

const businessFactsRecords = [
  { entityKey: "BusinessFacts:business_facts_main", data: {
      id: "0134e2bd-7d31-40be-a762-945f300bb132",
      cityZip: "101 00 Vinohrady, Praha 2",
      createdAt: new Date("2026-10-12T19:59:47.424Z"),
      deliveryAvailable: false,
      email: "info@kuskolace.cz",
      name: "Kus Koláče",
      phone: "608 903 828",
      priceRangeCzk: "100–200 Kč",
      ratingScore: new Prisma.Decimal("4.7"),
      reviewsCount: 1265,
      streetAddress: "Korunní 90",
      takeawayAvailable: true
    }, relations: [] },
] as const;

const openingHourRecords = [
  { entityKey: "OpeningHour:opening_hour_po", data: {
      id: "ff5c2f73-7138-4641-aab9-edb869fcc648",
      closeTime: "17:00",
      createdAt: new Date("2026-10-12T10:00:00.000Z"),
      dayKey: OpeningDayKey.PO,
      dayName: "Pondělí",
      isOpen: true,
      note: "nebo do vyprodání",
      openTime: "08:00",
      sortOrder: 1
    }, relations: [] },
  { entityKey: "OpeningHour:opening_hour_ut", data: {
      id: "fd649b0c-3d53-46c4-a632-3fd45a287834",
      closeTime: "17:00",
      createdAt: new Date("2026-10-12T10:00:00.000Z"),
      dayKey: OpeningDayKey.UT,
      dayName: "Úterý",
      isOpen: true,
      note: "nebo do vyprodání",
      openTime: "08:00",
      sortOrder: 2
    }, relations: [] },
  { entityKey: "OpeningHour:opening_hour_st", data: {
      id: "0b0d48ea-5d53-458d-a0dc-51257b94708c",
      closeTime: "17:00",
      createdAt: new Date("2026-10-12T10:00:00.000Z"),
      dayKey: OpeningDayKey.ST,
      dayName: "Středa",
      isOpen: true,
      note: "nebo do vyprodání",
      openTime: "08:00",
      sortOrder: 3
    }, relations: [] },
  { entityKey: "OpeningHour:opening_hour_ct", data: {
      id: "af04e9d0-2bdb-455c-a697-0955092dc569",
      closeTime: "17:00",
      createdAt: new Date("2026-10-12T10:00:00.000Z"),
      dayKey: OpeningDayKey.CT,
      dayName: "Čtvrtek",
      isOpen: true,
      note: "nebo do vyprodání",
      openTime: "08:00",
      sortOrder: 4
    }, relations: [] },
  { entityKey: "OpeningHour:opening_hour_pa", data: {
      id: "f370cafc-89a3-4090-a42c-c165cdabd5d1",
      closeTime: "17:00",
      createdAt: new Date("2026-10-12T10:00:00.000Z"),
      dayKey: OpeningDayKey.PA,
      dayName: "Pátek",
      isOpen: true,
      note: "čerstvé koláče na víkend, do vyprodání",
      openTime: "08:00",
      sortOrder: 5
    }, relations: [] },
  { entityKey: "OpeningHour:opening_hour_so", data: {
      id: "d00cb8dc-fd86-45ae-a78f-0d9b670c94d8",
      closeTime: "14:00",
      createdAt: new Date("2026-10-12T10:00:00.000Z"),
      dayKey: OpeningDayKey.SO,
      dayName: "Sobota",
      isOpen: true,
      note: "víkendový brunch a koláče, do vyprodání",
      openTime: "08:30",
      sortOrder: 6
    }, relations: [] },
  { entityKey: "OpeningHour:opening_hour_ne", data: {
      id: "aca3ba4c-135e-4c9d-afc6-d9cc3fc8f9dc",
      closeTime: "00:00",
      createdAt: new Date("2026-10-12T10:00:00.000Z"),
      dayKey: OpeningDayKey.NE,
      dayName: "Neděle",
      isOpen: false,
      note: "Zavřeno – příprava kvasu a sanitární den",
      openTime: "00:00",
      sortOrder: 7
    }, relations: [] },
] as const;

const cmsConfigRecords = [
  { entityKey: "CmsConfig:cms_cfg_kus_kolace_main_01", data: {
      id: "8b16cf6d-4b3f-4bb6-ab4c-f70693be1e57",
      createdAt: new Date("2026-01-15T06:00:00.000Z"),
      isContactVisible: true,
      isInstagramVisible: true,
      isShowcaseVisible: true,
      isStoryVisible: true,
      isWebPublished: true,
      storyBody: "Příběh Kus Koláče začal touhou vrátit do Prahy vůni skutečného venkovského koláče, jaký pekly naše babičky. Nepoužíváme žádné směsi ani umělá kypřidla – pouze výběrovou mouku z rodinného mlýna, farmářské čerstvé máslo, poctivý plnotučný tvaroh a ovoce z českých sadů.\n\nTěsto kyne pomalu v chladu, aby získalo svou typickou jemnost a plnou chuť. Ráno v pět roztápíme pece a sypeme na plechy bohatou máslovou drobenku. Pečeme v malých várkách po celý den, aby byl každý koláč na pultu ještě vlahý.",
      storyTitle: "O našem těstě, ranním kynutí a poctivém řemesle",
      welcomeHeading: "Kus Koláče – Řemeslné pečení s vůní poctivého másla",
      welcomePreamble: "Každé ráno zaděláváme kynutá těsta podle staročeských receptur. Pečeme tradiční kynuté koláče s tvarohem, povidly, mákem a sezónním ovocem od lokálních sadařů na pražských Vinohradech."
    }, relations: [] },
] as const;

const instagramConfigRecords = [
  { entityKey: "InstagramConfig:instagram_config_main", data: {
      id: "341ff82c-2415-4b7a-ae46-712fa4384c83",
      accountHandle: "@kuskolace",
      autoSync: true,
      createdAt: new Date("2026-10-01T08:00:00.000Z"),
      feedMode: InstagramFeedMode.FALLBACK,
      lastSyncAt: "Dnes v 08:30 (před 35 min)",
      syncStatus: InstagramSyncStatus.AUTORIZOVANO
    }, relations: [] },
] as const;

const pastryItemRecords = [
  { entityKey: "PastryItem:pastry-vinohrady-kolac-boruvka", data: {
      id: "57727f8b-15ea-4dd0-a1cc-dd76a50c0c6e",
      allergens: ["1 - Obiloviny obsahující lepek", "3 - Vejce", "7 - Mléko"] as Prisma.InputJsonValue,
      category: PastryCategory.OVOCNE_KOLACE,
      createdAt: new Date("2026-10-12T05:00:00.000Z"),
      displayOrder: 1,
      freshnessLabel: "Pečeno dnes ráno",
      fullDescription: "Náš vlajkový koláč s vysokým podílem plnotučného jihočeského tvarohu a štědrou vrstvou lesních borůvek. Těsto kyne pomalu 14 hodin a drobenku hněteme výhradně z pravého 84% českého másla.",
      ingredients: ["Pšeničná hladká mouka z mlýna", "84% české máslo", "Lesní borůvky", "Farmářský plnotučný tvaroh", "Třtinový cukr", "Čerstvá vejce", "Pravá vanilka"] as Prisma.InputJsonValue,
      isSoldOut: false,
      isTodaySpecial: true,
      itemCode: "KOL-BOR-01",
      name: "Vinohradský borůvkový koláč s tvarohem",
      photoKey: "https://www.autocoder.cc/background/project_image/project_attachments/user_5759470843581057556/4d64ffd31a9e4f54a465a3238868e3d9.jpg",
      priceCzk: 165,
      shortDescription: "Plný lesních borůvek a jemného farmářského tvarohu pod bohatou vrstvou máslové drobenky."
    }, relations: [] },
  { entityKey: "PastryItem:pastry-starocesky-kolac-povidla", data: {
      id: "dca46984-a72b-4484-a92d-c979b682c417",
      allergens: ["1 - Obiloviny obsahující lepek", "7 - Mléko", "8 - Skořápkové plody"] as Prisma.InputJsonValue,
      category: PastryCategory.OVOCNE_KOLACE,
      createdAt: new Date("2026-10-12T05:15:00.000Z"),
      displayOrder: 2,
      freshnessLabel: "Pečeno dnes v 05:30",
      fullDescription: "Tradiční dvojitá náplň z pomalu vařených švestkových povidel se skořicí a čerstvě umletého českého modrého máku. Křupavá drobenka je provoněná kapkou tuzemského rumu.",
      ingredients: ["Pšeničná mouka", "Hustá švestková povidla", "Český modrý mák", "84% máslo", "Plnotučné mléko", "Skořice", "Třtinový cukr"] as Prisma.InputJsonValue,
      isSoldOut: false,
      isTodaySpecial: false,
      itemCode: "KOL-POVI-02",
      name: "Staročeský povidlový koláč s mákem",
      photoKey: "https://www.autocoder.cc/background/zaki_prod/generated/c0afac9aad094ffaa52662a8e42844b0.png",
      priceCzk: 145,
      shortDescription: "Hustá švestková povidla s mletým modrým mákem a máslovou mandlovou drobenkou."
    }, relations: [] },
  { entityKey: "PastryItem:pastry-merunkovy-kolac-tvaroh", data: {
      id: "3bbdb451-9020-4e81-a22c-3399c97cda9f",
      allergens: ["1 - Obiloviny obsahující lepek", "3 - Vejce", "7 - Mléko"] as Prisma.InputJsonValue,
      category: PastryCategory.OVOCNE_KOLACE,
      createdAt: new Date("2026-10-12T05:30:00.000Z"),
      displayOrder: 3,
      freshnessLabel: "Pečeno dnes v 06:00",
      fullDescription: "Kombinace sladkokyselých meruněk a sametového tvarohového krému s pravou vanilkou Bourbon. Těsto je lehké, vláčné a nadýchané díky tradičnímu kynutí.",
      ingredients: ["Pšeničná hladká mouka", "Čerstvé meruňky", "Farmářský tvaroh", "84% české máslo", "Žloutky z volného chovu", "Bourbon vanilka", "Cukr krupice"] as Prisma.InputJsonValue,
      isSoldOut: false,
      isTodaySpecial: false,
      itemCode: "KOL-MERU-03",
      name: "Meruňkový koláč s jemným tvarohem",
      photoKey: "https://www.autocoder.cc/background/zaki_prod/generated/bd51ef7a6cc34368b8b03cd413c8a587.png",
      priceCzk: 155,
      shortDescription: "Šťavnaté zralé meruňky na vanilkovém tvarohovém lůžku s křehkou máslovou drobenkou."
    }, relations: [] },
  { entityKey: "PastryItem:pastry-kynuta-buchta-tvaroh", data: {
      id: "9b361da3-3a1d-4227-ae95-491e186e46bd",
      allergens: ["1 - Obiloviny obsahující lepek", "3 - Vejce", "7 - Mléko"] as Prisma.InputJsonValue,
      category: PastryCategory.KYNUTE_BUCHTY_A_LOUPAKY,
      createdAt: new Date("2026-10-12T05:45:00.000Z"),
      displayOrder: 4,
      freshnessLabel: "Pečeno dnes v 06:15",
      fullDescription: "Poctivé pekáčové buchty pečené těsně vedle sebe, bohatě maštěné máslem po vytažení z trouby. Vláčný tvaroh je doplněn zlatými rozinkami naloženými v tuzemáku.",
      ingredients: ["Hladká pšeničná mouka", "Farmářský tvaroh", "84% máslo", "Čerstvé mléko", "Zlaté rozinky", "Tuzemský rum", "Citrónová kůra"] as Prisma.InputJsonValue,
      isSoldOut: false,
      isTodaySpecial: false,
      itemCode: "BUC-TVAR-04",
      name: "Honzova kynutá buchta s farmářským tvarohem a rozinkami",
      photoKey: "https://www.autocoder.cc/background/zaki_prod/generated/3eb157ad2e5b4697912221f956fb5dd3.png",
      priceCzk: 58,
      shortDescription: "Zlatavá pekáčová buchta bohatě plněná jemným tvarohem macerovaným v rumu."
    }, relations: [] },
  { entityKey: "PastryItem:pastry-kynuta-buchta-povidla", data: {
      id: "b457cf27-d122-421d-ad31-db43e751fd59",
      allergens: ["1 - Obiloviny obsahující lepek", "3 - Vejce", "7 - Mléko"] as Prisma.InputJsonValue,
      category: PastryCategory.KYNUTE_BUCHTY_A_LOUPAKY,
      createdAt: new Date("2026-10-12T06:00:00.000Z"),
      displayOrder: 5,
      freshnessLabel: "Vyprodáno v 14:20",
      fullDescription: "Klasické české buchty z měkkého kynutého těsta s vysokým obílením máslem, plněné hustými švestkovými povidly ovoněnými hřebíčkem a badyánem.",
      ingredients: ["Hladká mouka", "Švestková povidla", "České máslo", "Mléko", "Žloutky", "Badyán", "Skořice", "Rum"] as Prisma.InputJsonValue,
      isSoldOut: true,
      isTodaySpecial: false,
      itemCode: "BUC-POVI-05",
      name: "Honzova kynutá buchta se švestkovými povidly",
      photoKey: "https://www.autocoder.cc/background/zaki_prod/generated/4a8fc8fef3b143ea91b0bb96934f659d.png",
      priceCzk: 55,
      shortDescription: "Nadýchané pekáčové buchty bohatě plněné povidly pečenými se skořicí a badyánem."
    }, relations: [] },
  { entityKey: "PastryItem:pastry-skoricovy-snek", data: {
      id: "5208c587-97e4-4aa0-aa7f-0977db515646",
      allergens: ["1 - Obiloviny obsahující lepek", "7 - Mléko"] as Prisma.InputJsonValue,
      category: PastryCategory.KYNUTE_BUCHTY_A_LOUPAKY,
      createdAt: new Date("2026-10-12T06:15:00.000Z"),
      displayOrder: 6,
      freshnessLabel: "Pečeno dnes v 06:45",
      fullDescription: "Pomalé kynutí dává těstu lehkost a vláčnost. Bohatá skořicová náplň z pravé cejlonské skořice a přepuštěného másla zkaramelizuje během pečení na spodní i vrchní straně.",
      ingredients: ["Pšeničná mouka", "Cejlonská skořice", "Třtinový cukr", "84% české máslo", "Plnotučné mléko", "Kvasnice", "Mořská sůl"] as Prisma.InputJsonValue,
      isSoldOut: false,
      isTodaySpecial: false,
      itemCode: "SNE-SKOR-06",
      name: "Skořicový šnek s karamelovou krustou",
      photoKey: "https://www.autocoder.cc/background/zaki_prod/generated/eaad6a5830d14d76a245c62ff88fb833.png",
      priceCzk: 68,
      shortDescription: "Šťavnatý kynutý motanec s cejlonskou skořicí a křupavou třtinovou krustou."
    }, relations: [] },
  { entityKey: "PastryItem:pastry-pistaciovy-loupak", data: {
      id: "e379e7b2-e74e-43f4-abfe-49f6b1a3c424",
      allergens: ["1 - Obiloviny obsahující lepek", "3 - Vejce", "7 - Mléko", "8 - Skořápkové plody"] as Prisma.InputJsonValue,
      category: PastryCategory.KYNUTE_BUCHTY_A_LOUPAKY,
      createdAt: new Date("2026-10-12T06:30:00.000Z"),
      displayOrder: 7,
      freshnessLabel: "Pečeno dnes v 07:00",
      fullDescription: "Tradiční receptura obohacená o jemnou pistáciovou pastu a posyp z nesolených pražených pistácií. Skvěle se hodí k výběrovému espressu z naší nabídky.",
      ingredients: ["Pšeničná hladká mouka", "84% máslo", "Sicilské pistácie", "Čerstvé mléko", "Včelí med", "Vejce", "Třtinový cukr"] as Prisma.InputJsonValue,
      isSoldOut: false,
      isTodaySpecial: false,
      itemCode: "LOU-PIST-07",
      name: "Vinohradský máslový loupák s drcenými pistáciemi",
      photoKey: "https://www.autocoder.cc/background/zaki_prod/generated/11757a17a48c43808d90748ece3ab19b.png",
      priceCzk: 72,
      shortDescription: "Křehký ručně vázaný loupáček s máslovým těstem a posypem ze sicilských pistácií."
    }, relations: [] },
  { entityKey: "PastryItem:pastry-slany-kolac-kozi-syr", data: {
      id: "59724368-1a1d-45c1-a6f1-b8fe367fb314",
      allergens: ["1 - Obiloviny obsahující lepek", "3 - Vejce", "7 - Mléko"] as Prisma.InputJsonValue,
      category: PastryCategory.SLANE_PECIVO,
      createdAt: new Date("2026-10-12T06:45:00.000Z"),
      displayOrder: 8,
      freshnessLabel: "Pečeno dnes v 07:15",
      fullDescription: "Naše oblíbená slaná alternativa pečená z poctivého křehkého těsta. Kombinace jemně pikantního kozího sýra z lokální farmy, tymiánu a sladké zkaramelizované cibulky.",
      ingredients: ["Pšeničná mouka", "České máslo", "Kozí sýr", "Červená cibule", "Smetana 33%", "Čerstvá vejce", "Čerstvý tymián", "Mořská sůl", "Pepř"] as Prisma.InputJsonValue,
      isSoldOut: false,
      isTodaySpecial: false,
      itemCode: "SLA-KOZA-08",
      name: "Slaný koláč s kozím sýrem a zkaramelizovanou cibulkou",
      photoKey: "https://www.autocoder.cc/background/zaki_prod/generated/2ef671270af84318865746e3effb162a.png",
      priceCzk: 135,
      shortDescription: "Křehké máslové těsto plněné vyzrálým kozím sýrem, tymiánem a pomalu dušenou červenou cibulí."
    }, relations: [] },
] as const;

const instagramPostRecords = [
  { entityKey: "InstagramPost:instagram_post_1", data: {
      id: "c2adc14a-1bf7-4310-a691-ab5424c5d0ac",
      caption: "Dobré ráno z Korunní! Dnešní vitrína je od osmi naplněná po okraj. Čerstvé borůvky, meruňky i ještě teplé buchty čekají.",
      createdAt: new Date("2026-10-12T17:59:47.000Z"),
      isFeatured: true,
      isFromApi: true,
      likesCount: 482,
      photoKey: "https://www.autocoder.cc/background/zaki_prod/generated/9c2ff22d93664bafae8c40c3197beaee.png",
      postUrl: "https://www.instagram.com/p/DB1aK90sX1/",
      publishedLabel: "Před 2 hodinami"
    }, relations: [] },
  { entityKey: "InstagramPost:instagram_post_2", data: {
      id: "f7262ced-dda7-460b-a63a-e95466bb6bf1",
      caption: "Kardamomové a skořicové uzly právě vytažené z pece. Máslo syčí a vůně se line až k tramvaji.",
      createdAt: new Date("2026-10-12T14:59:47.000Z"),
      isFeatured: false,
      isFromApi: true,
      likesCount: 319,
      photoKey: "https://www.autocoder.cc/background/zaki_prod/generated/dd53a20b8d174909b7d79abc4b7cf1d8.png",
      postUrl: "https://www.instagram.com/p/DB2bL81tY2/",
      publishedLabel: "Před 5 hodinami"
    }, relations: [] },
  { entityKey: "InstagramPost:instagram_post_3", data: {
      id: "f4d29172-cb94-4fa0-a356-3904af06d4fa",
      caption: "Ideální vinohradské ráno: dvojité espresso a velký kus tvarohového koláče s drobenkou.",
      createdAt: new Date("2026-10-11T16:30:00.000Z"),
      isFeatured: false,
      isFromApi: true,
      likesCount: 541,
      photoKey: "https://www.autocoder.cc/background/zaki_prod/generated/f6180dc83bf94669a1eea823a0c4950f.png",
      postUrl: "https://www.instagram.com/p/DB3cM72uZ3/",
      publishedLabel: "Včera"
    }, relations: [] },
  { entityKey: "InstagramPost:instagram_post_4", data: {
      id: "7869f464-8da7-4b31-ae42-57f5bf53f2b2",
      caption: "Další plech borůvkových koláčů právě putuje do vitríny. Křupavá drobenka a poctivé jihočeské máslo.",
      createdAt: new Date("2026-10-10T09:15:00.000Z"),
      isFeatured: false,
      isFromApi: true,
      likesCount: 395,
      photoKey: "https://www.autocoder.cc/background/zaki_prod/generated/822fe25636ca4d4a842008a59994462f.png",
      postUrl: "https://www.instagram.com/p/DB4dN63vA4/",
      publishedLabel: "Před 2 dny"
    }, relations: [] },
  { entityKey: "InstagramPost:instagram_post_5", data: {
      id: "4e1d9d17-1546-4615-ac8a-99b08395d578",
      caption: "Ranní slunce na Korunní a vůně vanilky z naší pekárny. Zastavte se cestou do práce na čerstvý loupák.",
      createdAt: new Date("2026-10-09T08:00:00.000Z"),
      isFeatured: false,
      isFromApi: false,
      likesCount: 428,
      photoKey: "https://www.autocoder.cc/background/zaki_prod/generated/2857f3f96d0c41cf89776cdae0524104.png",
      postUrl: "https://www.instagram.com/p/DB5eO54wB5/",
      publishedLabel: "Před 3 dny"
    }, relations: [] },
  { entityKey: "InstagramPost:instagram_post_6", data: {
      id: "1764d7fa-5171-460a-a6e5-780947145468",
      caption: "Těsto na zítřejší kynuté buchty už pomalu odpočívá. Žádný spěch, jen poctivý čas a řemeslo.",
      createdAt: new Date("2026-10-08T18:45:00.000Z"),
      isFeatured: false,
      isFromApi: true,
      likesCount: 276,
      photoKey: "https://www.autocoder.cc/background/zaki_prod/generated/688b635decb644a6a68451a57261ef83.png",
      postUrl: "https://www.instagram.com/p/DB6fP45xC6/",
      publishedLabel: "Před 4 dny"
    }, relations: [] },
] as const;

function requireEntity(entities: Map<string, SeedEntity>, entityKey: string): SeedEntity {
  const entity = entities.get(entityKey);
  if (!entity) throw new Error(`seed relation target was not created: ${entityKey}`);
  return entity;
}

async function main() {
  await prisma.$transaction(async (tx) => {
    const entities = new Map<string, SeedEntity>();
    await tx.instagramPost.deleteMany({});
    await tx.pastryItem.deleteMany({});
    await tx.instagramConfig.deleteMany({});
    await tx.cmsConfig.deleteMany({});
    await tx.openingHour.deleteMany({});
    await tx.businessFacts.deleteMany({});
    await tx.accountUser.deleteMany({});

    for (const record of accountUserRecords) {
      const data: Record<string, unknown> = { ...record.data };
      for (const relation of record.relations as readonly RelationBinding[]) {
        const target = requireEntity(entities, relation.target_entity_key);
        relation.local_fields.forEach((field, index) => { data[field] = target[relation.target_fields[index]]; });
      }
      const created = await tx.accountUser.create({ data: data as unknown as Prisma.AccountUserUncheckedCreateInput });
      entities.set(record.entityKey, created as unknown as SeedEntity);
    }
    for (const record of businessFactsRecords) {
      const data: Record<string, unknown> = { ...record.data };
      for (const relation of record.relations as readonly RelationBinding[]) {
        const target = requireEntity(entities, relation.target_entity_key);
        relation.local_fields.forEach((field, index) => { data[field] = target[relation.target_fields[index]]; });
      }
      const created = await tx.businessFacts.create({ data: data as unknown as Prisma.BusinessFactsUncheckedCreateInput });
      entities.set(record.entityKey, created as unknown as SeedEntity);
    }
    for (const record of openingHourRecords) {
      const data: Record<string, unknown> = { ...record.data };
      for (const relation of record.relations as readonly RelationBinding[]) {
        const target = requireEntity(entities, relation.target_entity_key);
        relation.local_fields.forEach((field, index) => { data[field] = target[relation.target_fields[index]]; });
      }
      const created = await tx.openingHour.create({ data: data as unknown as Prisma.OpeningHourUncheckedCreateInput });
      entities.set(record.entityKey, created as unknown as SeedEntity);
    }
    for (const record of cmsConfigRecords) {
      const data: Record<string, unknown> = { ...record.data };
      for (const relation of record.relations as readonly RelationBinding[]) {
        const target = requireEntity(entities, relation.target_entity_key);
        relation.local_fields.forEach((field, index) => { data[field] = target[relation.target_fields[index]]; });
      }
      const created = await tx.cmsConfig.create({ data: data as unknown as Prisma.CmsConfigUncheckedCreateInput });
      entities.set(record.entityKey, created as unknown as SeedEntity);
    }
    for (const record of instagramConfigRecords) {
      const data: Record<string, unknown> = { ...record.data };
      for (const relation of record.relations as readonly RelationBinding[]) {
        const target = requireEntity(entities, relation.target_entity_key);
        relation.local_fields.forEach((field, index) => { data[field] = target[relation.target_fields[index]]; });
      }
      const created = await tx.instagramConfig.create({ data: data as unknown as Prisma.InstagramConfigUncheckedCreateInput });
      entities.set(record.entityKey, created as unknown as SeedEntity);
    }
    for (const record of pastryItemRecords) {
      const data: Record<string, unknown> = { ...record.data };
      for (const relation of record.relations as readonly RelationBinding[]) {
        const target = requireEntity(entities, relation.target_entity_key);
        relation.local_fields.forEach((field, index) => { data[field] = target[relation.target_fields[index]]; });
      }
      const created = await tx.pastryItem.create({ data: data as unknown as Prisma.PastryItemUncheckedCreateInput });
      entities.set(record.entityKey, created as unknown as SeedEntity);
    }
    for (const record of instagramPostRecords) {
      const data: Record<string, unknown> = { ...record.data };
      for (const relation of record.relations as readonly RelationBinding[]) {
        const target = requireEntity(entities, relation.target_entity_key);
        relation.local_fields.forEach((field, index) => { data[field] = target[relation.target_fields[index]]; });
      }
      const created = await tx.instagramPost.create({ data: data as unknown as Prisma.InstagramPostUncheckedCreateInput });
      entities.set(record.entityKey, created as unknown as SeedEntity);
    }
  }, { maxWait: 30_000, timeout: 300_000 });
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
