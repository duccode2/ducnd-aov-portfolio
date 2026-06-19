// nav scroll style
addEventListener('scroll', () => {
  document.querySelector('nav .bar').style.background =
    scrollY > 40 ? 'rgba(20,18,14,.85)' : 'rgba(20,18,14,.55)';
});

// reveal on scroll
const io = new IntersectionObserver(
  (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }),
  { threshold: .12 }
);
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// count up
const cio = new IntersectionObserver(
  (es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    cio.unobserve(e.target);
    const to = +e.target.dataset.to, suf = e.target.dataset.suffix || '';
    let n = 0;
    const step = () => {
      n += Math.ceil(to / 40);
      if (n >= to) n = to;
      e.target.innerHTML = n + suf;
      if (n < to) requestAnimationFrame(step);
    };
    step();
  }),
  { threshold: .6 }
);
document.querySelectorAll('.num').forEach((el) => cio.observe(el));

// hero role randomizer on hover
(function () {
  const role = document.querySelector('.hero-role');
  const title = role?.querySelector('.role-title');
  if (!role || !title || role.dataset.roleMode !== 'playful') return;

  const base = role.dataset.defaultRole || 'Brand Marketing Manager';
  const roles = [
    'Creative Planner',
    'Marketing Executive',
    'Video Editor',
    'Digital Marketing Executive',
    'Designer',
    'Account',
    'Vibe Coder',
  ];
  let timer = null;
  let last = -1;

  function pickRole() {
    let next = Math.floor(Math.random() * roles.length);
    if (roles.length > 1) {
      while (next === last) next = Math.floor(Math.random() * roles.length);
    }
    last = next;
    role.classList.add('has-alt-role');
    role.classList.add('is-swapping');
    window.setTimeout(() => {
      title.textContent = roles[next];
      role.classList.remove('is-swapping');
    }, 260);
  }

  role.addEventListener('mouseenter', () => {
    pickRole();
    timer = window.setInterval(pickRole, 1180);
  });

  role.addEventListener('mouseleave', () => {
    window.clearInterval(timer);
    timer = null;
    role.classList.add('is-swapping');
    window.setTimeout(() => {
      title.textContent = base;
      role.classList.remove('has-alt-role', 'is-swapping');
    }, 220);
  });
})();

// language switch for portfolio index
(function () {
  const switcher = document.querySelector('[data-lang-switch]');
  const page = document.body.dataset.i18nPage;
  if (!switcher || !page) return;

  const buttons = Array.from(switcher.querySelectorAll('[data-lang]'));
  const metaDescription = document.querySelector('meta[name="description"]');

  const content = {
    'portfolio-main': {
      vi: {
        title: 'Nguyễn Đình Đức — Brand Marketing Portfolio',
        description: 'Portfolio cá nhân của Nguyễn Đình Đức — Brand Marketing Manager. Brand strategy, campaign execution, content direction và AI workflow.',
        menu: ['My Story', 'Dự án', 'Năng lực', 'Liên hệ'],
        resume: 'My Resume',
        eyebrow: 'Self-code Portfolio · Brand Marketing · 2026',
        heroLead1: "Hi, I'm",
        heroLead2: 'Duc Nguyen.',
        heroRole: 'Brand Marketing Manager',
        heroBio: 'Tôi là Nguyễn Đình Đức — Brand Marketing Manager với hơn 6 năm xây dựng thương hiệu, triển khai chiến dịch, phát triển hệ thống marketing cho doanh nghiệp đa ngành và chào mừng bạn đến với Portfolio của tôi.',
        quickConnect: 'Kết nối',
        heroLinks: ['Email', 'LinkedIn', '+84 963 942 665'],
        heroMetaLabels: ['Địa chỉ'],
        heroMetaValues: ['Hà Nội, Việt Nam'],
        aboutStep: 'My Story',
        aboutHeading: 'Từ kỹ sư xây dựng đến <span class="serif-it">người xây thương hiệu</span>.',
        aboutParagraphs: [
          'Xuất phát từ ngành <strong>Kỹ sư Xây dựng</strong>, tôi chuyển hướng sang marketing từ những ngày còn trên giảng đường — bắt đầu từ agency, event production, rồi dần đi sâu vào brand strategy và campaign execution.',
          'Hơn 5 năm làm việc với các mô hình agency, in-house và multi-brand group, tôi tập trung vào một điều: kết nối chiến lược thương hiệu với kết quả kinh doanh thực tế — từ ý tưởng đến triển khai, từ định hướng đến con số.',
        ],
        stats: ['Năm kinh nghiệm', 'Thương hiệu hợp tác', 'Ngân sách lớn nhất', 'Quy mô team dẫn dắt'],
        statNumbers: [5, 50, 10, 30],
        statSuffixes: ['+', '+', ' tỷ', '+'],
        brandsHeading: 'Những <span class="serif-it">thương hiệu</span><br>tôi từng kết hợp',
        brandsDesc: 'Từ campaign 360°, event production, consumer goods đến hệ sinh thái đa thương hiệu.',
        workHeading: 'Một vài <span class="serif-it">dự án tiêu biểu</span>',
        caseLabels: ['Vai trò', 'Quy mô', 'Lĩnh vực', 'Vai trò', 'Thời gian', 'Lĩnh vực', 'Vai trò', 'Mục tiêu', 'Lĩnh vực', 'Vai trò', 'Thời gian', 'Lĩnh vực'],
        caseValues: ['Marketing Team Leader', 'Tết 2023 · Ngân sách 10 tỷ', 'Gia dụng', 'Marketing Manager', '2025–2026', 'Du lịch · Agency · BĐS', 'Planning & Execution', '2 tỷ / 6 tháng', 'FMCG · Oral Care', 'Marketing Team Leader', '2024–2025', 'Hàng tiêu dùng'],
        caseTitles: [
          'Kalite — Campaign Tết "Không Dầu thì Sẽ Giàu"',
          'Ladi Group — Multi-brand Ecosystem',
          'Colgate — Multi-product Content Campaign',
          'Bell Home — Xây kênh online từ con số 0',
        ],
        caseParagraphs: [
          'Dẫn dắt chiến dịch Tết cho thương hiệu Kalite với mục tiêu tạo khác biệt trong thị trường nồi chiên không dầu vốn đã cạnh tranh cao.',
          'Thay vì chỉ nói về "tiện lợi" hay "sức khỏe", chiến dịch khai thác một thông điệp gần với mùa Tết hơn: "Tết Không Dầu thì Giàu" — kết nối lợi ích sản phẩm với lời chúc thịnh vượng đầu năm.',
          'Tôi phụ trách điều phối kế hoạch truyền thông, làm việc với agency sản xuất, kiểm soát creative, phối hợp trade marketing và theo dõi hiệu quả triển khai trên nhiều điểm chạm.',
          'Ladi Group là hệ sinh thái đa ngành từ agency, staycation, bất động sản đến homestay, thành lập từ năm 2023 và mở rộng từ thế mạnh agency sang các nhánh kinh doanh mới.',
          'Với vai trò Marketing Manager, tôi xây dựng định hướng thương hiệu tổng thể, phát triển nội dung, kết nối đối tác và đảm bảo trải nghiệm nhất quán cho từng nhánh.',
          'Trọng tâm phụ trách gồm agency 70% và Airbnb Homestay 30%, với kết quả xây dựng chuỗi Ladi Homestay từ 0 tới 10 căn trong 6 tháng.',
          'Dự án triển khai chiến dịch Marketing cho Colgate trên TikTok bao gồm cả Branding và Ecom. Sản phẩm chính bao gồm các dòng sản phẩm kem đánh răng của Colgate như Colgate Optic, Total Plague, Purple,...',
          'Vai trò của tôi bao gồm 2 phần: lên kế hoạch và triển khai. Phần chính tôi phụ trách là triển khai bán sản phẩm trên TikTok Shop, với mục tiêu doanh số 2 tỷ trong vòng 6 tháng cho kênh livestream.',
          'Tôi phối hợp production để triển khai sản xuất tài nguyên video ads và content branding cho nhiều dòng sản phẩm.',
          'Xây dựng hệ thống kinh doanh online từ nền móng: đội ngũ, nội dung, kênh bán, quảng cáo, tracking và quy trình vận hành trên các nền tảng như Shopee và TikTok Shop.',
          'Tôi tham gia thiết lập vận hành team, tổ chức sản xuất nội dung và phát triển các điểm chạm social commerce cho thương hiệu.',
          'Dự án giúp Bell Home tăng trưởng doanh thu online và tạo nền tảng vận hành bền vững cho các kênh digital commerce.',
        ],
        caseButtons: ['Chi tiết', 'Chi tiết', 'Chi tiết', 'Chi tiết'],
        projectsTag: '/Dự án',
        projectsHeading: 'Những <span class="serif-it">dự án</span> tôi đã làm',
        projectTitles: [
          'VinFast — E-mobility Social Content',
          'Phở Đệ Nhất — Bí quyết gia truyền',
          'Dalat Hasfarm — Digital Shelf Talker',
          'Lazada — Video Campaign cho ngày sale lớn',
          'Làng Nuôi Biển Vân Đồn — Thương hiệu điểm đến',
          'Catier — Brand đồ ăn cho thú cưng',
        ],
        projectParagraphs: [
          'Triển khai nội dung social cho VinFast với trọng tâm là hình ảnh xe điện trẻ trung, gần gũi và dễ lan tỏa. Phối hợp sản xuất visual/video ngắn, khai thác bối cảnh đời sống và tinh thần di chuyển xanh để tăng nhận diện thương hiệu trên các nền tảng số.',
          'Triển khai nội dung campaign cho Phở Đệ Nhất, khai thác câu chuyện 15 năm bán phở và thông điệp "bí quyết gia truyền" để làm nổi bật hương vị nước dùng, nguyên liệu và cảm giác món phở nóng hổi gần gũi với người Việt.',
          'Concept và phối hợp sản xuất Digital Shelf Talker dạng video động cho Dalat Hasfarm tại điểm bán — biến màn hình trưng bày thành điểm chạm thương hiệu thu hút. Phụ trách từ ý tưởng sáng tạo, thiết kế motion đến xuất bản tài nguyên cho chuỗi cửa hàng.',
          'Sản xuất và chỉnh sửa video quảng cáo cho các chiến dịch sale trên Lazada — bao gồm TVC ngắn, banner động và content chốt sale. Đảm bảo đúng brand guideline client, tối ưu format cho từng placement kỹ thuật số và deadline gấp theo lịch campaign.',
          'Phụ trách xây dựng chiến lược thương hiệu và nội dung truyền thông cho dự án du lịch sinh thái biển Vân Đồn. Phát triển bộ nhận diện hình ảnh, tài liệu giới thiệu dự án và định hướng content marketing — kết nối câu chuyện bản địa với thị trường khách du lịch.',
          'Triển khai nội dung thương hiệu cho Catier Pet Food, tập trung vào sản phẩm đồ ăn tươi cho thú cưng với visual vui nhộn, dễ nhớ và gần gũi với cộng đồng nuôi pet. Nội dung nhấn mạnh nguyên liệu tươi, combo ưu đãi và hình ảnh boss đáng yêu.',
        ],
        projectButtons: ['Xem thêm', 'Xem thêm', 'Xem thêm', 'Xem thêm', 'Xem thêm', 'Xem thêm'],
        toolsHeading: 'Công cụ <span class="serif-it">tôi sử dụng</span>',
        educationHeading: 'Nền tảng <span class="serif-it">học vấn</span>',
        testimonialsTag: '/Testimonials',
        testimonialsHeading: 'Nhận xét từ <span class="serif-it">người từng làm việc cùng</span>',
        testimonialQuotes: [
          'Đức là một marketer trẻ có khả năng kết hợp giữa tư duy chiến lược và năng lực thực thi chi tiết. Trong quá trình làm việc tại UKG, Đức cho thấy khả năng quản lý đội nhóm, triển khai chiến dịch lớn và theo sát kết quả kinh doanh.',
          'Làm việc cùng Đức tại Ladi Group, tôi đánh giá cao khả năng nắm bắt mục tiêu kinh doanh nhanh và tư duy marketing có định hướng rõ ràng. Đức không chỉ xây dựng kế hoạch mà còn theo sát quá trình triển khai, phối hợp đội ngũ và đưa định hướng thương hiệu vào vận hành thực tế.',
        ],
        testimonialNames: ['Ms. Dương Hoài Thu', 'Ms. Ngọc Đặng'],
        testimonialRoles: [
          'Cựu Trưởng phòng Marketing · UKG Group',
          'Giám đốc Vận hành · Ladi Group',
        ],
        ctaTag: '/Liên hệ',
        ctaHeading: 'Cùng xây một điều gì đó<br><span class="serif-it">đáng nhớ</span>?',
        ctaSub: 'Tôi luôn sẵn sàng cho những cơ hội mới trong Brand Marketing, Campaign Strategy, Content Direction và các dự án cần kết hợp giữa tư duy hệ thống với sáng tạo thực tế.',
        ctaLabels: ['Phone / Zalo', 'LinkedIn', 'Location'],
        ctaValues: ['+84 963 942 665', 'linkedin.com/in/nguyen-dinh-duc', 'Hà Nội, Việt Nam'],
        footerAbout: 'Brand Marketing Manager — kết nối chiến lược thương hiệu với thực thi và kết quả kinh doanh thật.',
        footerHeadings: ['Chuyên môn', 'Portfolio', 'Liên hệ'],
        footerCol2: ['Brand Strategy', 'Campaign Execution', 'Content Direction', 'AI Workflow'],
        footerCol3: ['My Story', 'Dự án', 'Liên hệ'],
        footerCol4: ['ducnd.business@gmail.com', '+84 963 942 665', 'Hà Nội, Việt Nam'],
        footerSmall: ['© 2026 NGUYỄN ĐÌNH ĐỨC — PERSONAL PORTFOLIO', 'BRAND MARKETING · CAMPAIGN · CONTENT · AI WORKFLOW'],
        testiButtons: ['Trước', 'Tiếp'],
      },
      en: {
        title: 'Nguyen Dinh Duc — Brand Marketing Portfolio',
        description: 'Personal portfolio of Nguyen Dinh Duc — Brand Marketing Manager. Brand strategy, campaign execution, content direction and AI workflow.',
        menu: ['My Story', 'Work', 'Capabilities', 'Contact'],
        resume: 'My Resume',
        eyebrow: 'Self-coded Portfolio · Brand Marketing · 2026',
        heroLead1: "Hi, I'm",
        heroLead2: 'Duc Nguyen.',
        heroRole: 'Brand Marketing Manager',
        heroBio: 'I am Nguyen Dinh Duc — a Brand Marketing Manager with 6+ years of experience building brands, launching campaigns, and developing marketing systems for multi-industry businesses. Welcome to my portfolio.',
        quickConnect: 'Connect',
        heroLinks: ['Email', 'LinkedIn', '+84 963 942 665'],
        heroMetaLabels: ['Location'],
        heroMetaValues: ['Hanoi, Vietnam'],
        aboutStep: 'My Story',
        aboutHeading: 'From civil engineering to <span class="serif-it">brand building</span>.',
        aboutParagraphs: [
          'Starting from a <strong>Civil Engineering</strong> background, I moved into marketing while still at university — beginning with agency work and event production, then gradually growing into brand strategy and campaign execution.',
          'Across 5+ years in agency, in-house, and multi-brand group environments, I have focused on one thing: connecting brand strategy with real business outcomes — from idea to execution, from direction to numbers.',
        ],
        stats: ['Years of experience', 'Brands collaborated with', 'Largest budget managed', 'Largest team led'],
        statNumbers: [5, 50, 10, 30],
        statSuffixes: ['+', '+', 'B', '+'],
        brandsHeading: 'Some <span class="serif-it">brands</span><br>I have worked with',
        brandsDesc: 'From 360 campaigns and event production to consumer goods and multi-brand ecosystems.',
        workHeading: 'Selected <span class="serif-it">case studies</span>',
        caseLabels: ['Role', 'Scale', 'Category', 'Role', 'Timeline', 'Category', 'Role', 'Target', 'Category', 'Role', 'Timeline', 'Category'],
        caseValues: ['Marketing Team Leader', 'Tet 2023 · 10B VND budget', 'Home appliances', 'Marketing Manager', '2025–2026', 'Travel · Agency · Real estate', 'Planning & Execution', '2B VND / 6 months', 'FMCG · Oral care', 'Marketing Team Leader', '2024–2025', 'Consumer goods'],
        caseTitles: [
          'Kalite — Tet Campaign "No Oil, More Prosperity"',
          'Ladi Group — Multi-brand Ecosystem',
          'Colgate — Multi-product Content Campaign',
          'Bell Home — Building an Online Channel from Zero',
        ],
        caseParagraphs: [
          'Led Tet campaign execution for Kalite, with the goal of creating a distinctive market angle in the highly competitive air-fryer category.',
          'Instead of only talking about convenience or health, the campaign connected product benefits with a festive prosperity message: "No Oil, More Prosperity."',
          'I was responsible for coordinating the communications plan, working with production agencies, controlling creative quality, aligning with trade marketing, and tracking performance across touchpoints.',
          'Ladi Group is a multi-sector ecosystem spanning agency services, staycation, real estate, and homestay, built from a strong agency foundation into a broader portfolio.',
          'As Marketing Manager, I shaped the overall brand direction, content development, partner collaboration, and a consistent experience across business units.',
          'My focus covered roughly 70% agency and 30% Airbnb homestay, including growing Ladi Homestay from 0 to 10 properties in 6 months.',
          'This project covered both branding and e-commerce marketing for Colgate on TikTok, with key products including Optic White, Total, and Purple Serum lines.',
          'My role combined planning and execution, with a core focus on driving TikTok Shop sales and supporting a 2B VND livestream revenue target over 6 months.',
          'I also coordinated with the production team to create video ad assets and branding content for multiple product lines.',
          "Built Bell Home's online business system from the ground up: team, content, sales channels, advertising, tracking, and operations across Shopee and TikTok Shop.",
          "I helped set up team operations, organize content production, and develop the brand's social commerce touchpoints.",
          "The project created sustainable online revenue growth and laid the operational foundation for Bell Home's digital commerce channels.",
        ],
        caseButtons: ['View details', 'View details', 'View details', 'View details'],
        projectsTag: '/Projects',
        projectsHeading: 'Additional <span class="serif-it">projects</span>',
        projectTitles: [
          'VinFast — E-mobility Social Content',
          'Pho De Nhat — Heritage Recipe Storytelling',
          'Dalat Hasfarm — Digital Shelf Talker',
          'Lazada — Major Sale Video Campaign',
          'Van Don Sea Village — Destination Branding',
          'Catier — Pet Food Brand Content',
        ],
        projectParagraphs: [
          'Produced social content for VinFast focused on a youthful, approachable, and highly shareable electric mobility image. The project blended short-form visuals, everyday settings, and green mobility storytelling for digital platforms.',
          'Developed campaign content for Pho De Nhat by turning a 15-year pho story and its "heritage recipe" message into a warm, culturally familiar brand narrative for Vietnamese audiences.',
          'Created and coordinated motion-based digital shelf talkers for Dalat Hasfarm retail stores — turning display screens into more engaging brand touchpoints, from concept to final rollout assets.',
          'Produced and edited advertising videos for Lazada sales events, including short TVCs, animated banners, and conversion-focused sale content tailored to multiple digital placements and tight campaign deadlines.',
          'Built brand strategy and communications content for the Van Don marine eco-tourism project, including visual identity materials and content direction that connected local storytelling with travel audiences.',
          'Developed brand content for Catier Pet Food with a playful, memorable tone aimed at pet owners, highlighting fresh ingredients, value bundles, and lovable pet-focused visuals.',
        ],
        projectButtons: ['Explore', 'Explore', 'Explore', 'Explore', 'Explore', 'Explore'],
        toolsHeading: 'Tools <span class="serif-it">I use</span>',
        educationHeading: 'Educational <span class="serif-it">foundation</span>',
        testimonialsTag: '/Testimonials',
        testimonialsHeading: 'What people <span class="serif-it">say about working with me</span>',
        testimonialQuotes: [
          'Duc is a young marketer who combines strategic thinking with detailed execution. During our time at UKG, he demonstrated strong team management, large campaign rollout capability, and close attention to business results.',
          "Working with Duc at Ladi Group, I highly valued how quickly he understood business goals and how clearly he approached marketing direction. He did not just build plans but stayed close to execution, coordinated teams, and translated brand direction into real operations.",
        ],
        testimonialNames: ['Ms. Dương Hoài Thu', 'Ms. Ngọc Đặng'],
        testimonialRoles: [
          'Former Head of Marketing · UKG Group',
          'Chief Operating Officer · Ladi Group',
        ],
        ctaTag: '/Contact',
        ctaHeading: "Let's build something<br><span class=\"serif-it\">worth remembering</span>.",
        ctaSub: 'I am open to new opportunities in Brand Marketing, Campaign Strategy, Content Direction, and projects that need both structured thinking and practical creativity.',
        ctaLabels: ['Phone / Zalo', 'LinkedIn', 'Location'],
        ctaValues: ['+84 963 942 665', 'linkedin.com/in/nguyen-dinh-duc', 'Hanoi, Vietnam'],
        footerAbout: 'Brand Marketing Manager — connecting brand strategy with execution and real business results.',
        footerHeadings: ['Expertise', 'Portfolio', 'Contact'],
        footerCol2: ['Brand Strategy', 'Campaign Execution', 'Content Direction', 'AI Workflow'],
        footerCol3: ['My Story', 'Work', 'Contact'],
        footerCol4: ['ducnd.business@gmail.com', '+84 963 942 665', 'Hanoi, Vietnam'],
        footerSmall: ['© 2026 NGUYEN DINH DUC — PERSONAL PORTFOLIO', 'BRAND MARKETING · CAMPAIGN · CONTENT · AI WORKFLOW'],
        testiButtons: ['Previous', 'Next'],
      },
    },
  };

  content['portfolio-hiring'] = {
    vi: {
      ...content['portfolio-main'].vi,
      description: 'Portfolio tuyển dụng của Nguyễn Đình Đức — Brand Marketing Manager với kinh nghiệm brand strategy, campaign execution, content direction và AI workflow cho nhiều ngành hàng.',
      menu: ['My Story', 'Case Study', 'Projects', 'Năng lực', 'Liên hệ'],
      resume: 'Xem CV',
      eyebrow: 'Portfolio tuyển dụng · Brand Marketing · 2026',
      heroBios: [
        'Tôi là Nguyễn Đình Đức — Brand Marketing Manager với hơn 6 năm kinh nghiệm dẫn dắt thương hiệu cho các doanh nghiệp đa thương hiệu trong ngành gia dụng, nội thất, bất động sản và consumer brand.',
        'Điểm mạnh của tôi là kết nối tư duy thương hiệu với thực thi thực tế: từ chiến lược, nội dung, KOL/KOC, social, e-commerce đến quản lý production, phân tích dữ liệu và theo dõi hiệu quả kinh doanh.',
      ],
      heroFitTitle: 'Phù hợp với:',
      heroFitItems: ['Brand Marketing Manager', 'Marketing Lead', 'Branding Team Lead', 'Campaign Lead'],
      quickConnect: 'Kết nối nhanh',
      heroMetaLabels: ['Địa điểm', 'Mục tiêu'],
      heroMetaValues: ['Hai Bà Trưng, Hà Nội', 'Brand Lead · Marketing Lead · Branding'],
      aboutHeading: 'Từ nền tảng kỹ thuật đến <span class="serif-it">người làm thương hiệu</span>.',
      aboutParagraphs: [
        'Tôi bắt đầu từ nền tảng kỹ sư xây dựng, sau đó chuyển hướng sang marketing qua agency, event production và brand execution. Chính quãng chuyển nghề này giúp tôi có lối làm việc khá hệ thống, chịu được áp lực triển khai và quen với môi trường nhiều đầu việc song song.',
        'Trong hơn 6 năm, tôi đã đi qua các vai trò từ account, creative planner, brand marketing executive đến marketing manager và team leader. Hành trình nghề nghiệp đi từ Cooken Agency, UKG Group, Bell Home đến Ladi Group giúp tôi quen với bài toán vừa xây định hướng thương hiệu, vừa tổ chức triển khai cụ thể cho social, KOL/KOC, trade, production và e-commerce.',
        'Mục tiêu nghề nghiệp của tôi là tiếp tục phát triển theo hướng Brand Marketing Lead hoặc Marketing Manager, nơi tôi có thể dùng thế mạnh sáng tạo nội dung, phân tích dữ liệu và xây chiến lược truyền thông để gia tăng giá trị thương hiệu một cách bền vững.',
      ],
      workHeading: '4 <span class="serif-it">case study</span> nên xem đầu tiên',
      workNote: 'Đây là 4 dự án nên được ưu tiên khi apply vì thể hiện rõ nhất năng lực strategy, execution, quản lý nguồn lực, xây hệ thống và tác động kinh doanh.',
      caseLabels: ['Vai trò', 'Quy mô', 'Điểm mạnh', 'Vai trò', 'Mô hình', 'Điểm mạnh', 'Vai trò', 'Mục tiêu', 'Điểm mạnh', 'Vai trò', 'Kết quả', 'Điểm mạnh'],
      caseValues: [
        'Marketing Team Leader', 'Tết 2023 · Ngân sách 10 tỷ', 'Campaign 360 · KOC/KOL · Trade',
        'Marketing Manager', 'Multi-brand ecosystem', 'Brand Architecture · Growth',
        'Planning & Execution', '2 tỷ / 6 tháng', 'TikTok Shop · Livestream',
        'Marketing Team Leader', '0 → 300 triệu/tháng', 'Build Channel · Social Commerce',
      ],
      caseParagraphs: [
        'Một trong những chiến dịch lớn nhất tôi từng tham gia, triển khai cho mùa Tết trong bối cảnh thị trường nồi chiên không dầu cạnh tranh cao và thương hiệu cần một thông điệp thật khác biệt.',
        'Tôi phụ trách điều phối kế hoạch truyền thông, làm việc với production, creative, trade marketing và các đối tác KOC/KOL để triển khai đồng bộ trên nhiều điểm chạm.',
        'Dự án này thể hiện rõ năng lực quản lý chiến dịch lớn, kiểm soát ngân sách, phối hợp đa bên và bám sát hiệu quả kinh doanh.',
        'Ladi Group là case cho thấy cách tôi làm việc với mô hình đa ngành: vừa xây khung thương hiệu chung, vừa giữ được bản sắc riêng cho agency, homestay và các nhánh mở rộng.',
        'Vai trò của tôi không chỉ nằm ở nội dung hay social, mà còn ở việc thống nhất định hướng thương hiệu, tổ chức nguồn lực, kết nối đối tác và xây mô hình marketing có thể vận hành lâu dài.',
        'Theo CV, đây cũng là giai đoạn tôi xây chuỗi Ladi Homestay từ 0 lên 10 căn trong 6 tháng, với doanh thu tăng khoảng 10% mỗi tháng.',
        'Dự án cho thấy năng lực vận hành nội dung và bán hàng trên TikTok Shop ở ngành FMCG, nơi brand guideline chặt nhưng áp lực doanh số vẫn rất rõ.',
        'Tôi tham gia cả phần planning lẫn execution, trong đó trọng tâm là triển khai kênh livestream bán hàng với mục tiêu doanh số 2 tỷ trong 6 tháng.',
        'Case này giúp thể hiện khả năng cân bằng giữa branding, content production và hiệu quả chuyển đổi trên nền tảng social commerce.',
        'Bell Home là case nổi bật về xây hệ thống: từ đội ngũ, nội dung, kênh bán, quảng cáo, tracking đến quy trình vận hành cho social và e-commerce.',
        'Tôi phát triển hướng đi cân bằng giữa branding và performance, đồng thời tổ chức TikTok, livestream, KOL/KOC và Shopee theo mục tiêu doanh thu rõ ràng.',
        'Theo dữ liệu trong CV, doanh thu online đã tăng từ 0 lên 300 triệu/tháng, brand reach tăng từ 10K lên 500K/tháng và doanh số toàn công ty tăng 10–15% mỗi tháng.',
      ],
      caseButtons: ['Xem case study', 'Xem case study', 'Xem case study', 'Xem case study'],
      projectsTag: '/Additional Projects',
      projectsHeading: 'Các <span class="serif-it">dự án bổ sung</span>',
      projectNote: 'Phần này bổ sung thêm độ đa dạng ngành hàng và khả năng thích nghi của tôi ở social content, activation, F&B, e-commerce và brand communication.',
      projectParagraphs: [
        'Triển khai nội dung social cho VinFast với trọng tâm là hình ảnh xe điện trẻ trung, gần gũi và dễ lan tỏa. Dự án thể hiện khả năng chuyển sản phẩm kỹ thuật thành nội dung lifestyle dễ tiếp cận.',
        'Triển khai nội dung campaign cho Phở Đệ Nhất, khai thác câu chuyện thương hiệu và trải nghiệm món ăn theo hướng gần gũi nhưng vẫn đủ nổi bật để tạo độ hot trên Facebook và TikTok.',
        'Concept và phối hợp sản xuất Digital Shelf Talker dạng video động cho điểm bán. Dự án nhấn vào khả năng phát triển creative asset từ ý tưởng đến phiên bản xuất bản thực tế.',
        'Sản xuất và chỉnh sửa video quảng cáo cho các đợt sale lớn của Lazada. Dự án phù hợp để thể hiện khả năng làm việc nhanh, đúng brand guideline và tối ưu asset cho nhiều placement.',
        'Xây dựng chiến lược thương hiệu và nội dung truyền thông cho dự án du lịch sinh thái biển. Dự án cho thấy khả năng làm brand story và định vị cho mô hình điểm đến địa phương.',
        'Triển khai nội dung thương hiệu cho Catier Pet Food, tập trung vào visual vui nhộn, dễ nhớ và gần gũi với cộng đồng nuôi pet. Đây là dự án cho thấy khả năng thích nghi với tone of voice rất khác so với FMCG truyền thống.',
      ],
      toolsTag: '/Core Capability',
      toolsHeading: 'Những gì tôi <span class="serif-it">làm tốt nhất</span>',
      toolsNote: 'Tôi phù hợp nhất với các vai trò cần vừa tư duy thương hiệu, vừa tổ chức triển khai, quản lý team và phối hợp xuyên phòng ban.',
      educationTag: '/Education',
      educationHeading: 'Nền tảng <span class="serif-it">học vấn & kỹ năng</span>',
      testimonialsNote: 'Tôi giữ phần này ngắn gọn để nhà tuyển dụng đọc nhanh nhưng vẫn thấy rõ cách tôi làm việc trong thực tế.',
      testimonialQuotes: [
        'Đức có khả năng nối tư duy chiến lược với triển khai thực tế. Điểm mạnh của Đức là quản lý đầu việc nhiều bên nhưng vẫn bám được mục tiêu kinh doanh.',
        'Đức mang đến cách làm marketing có hệ thống, rõ mục tiêu và dễ vận hành. Không chỉ dừng ở ý tưởng, Đức biết cách biến định hướng thành kế hoạch triển khai cụ thể.',
        'Đức nắm brief nhanh, đặt đúng câu hỏi và giữ chất lượng output ổn định. Khi làm việc cùng, tôi đánh giá cao khả năng phối hợp giữa creative, production và client.',
      ],
      ctaHeading: 'Sẵn sàng cho <span class="serif-it">vai trò tiếp theo</span>.',
      ctaSub: 'Tôi đang tìm kiếm cơ hội Brand Marketing Manager / Marketing Lead / Branding Team Lead tại Hà Nội hoặc hybrid, nơi tôi có thể đóng góp cả ở chiến lược thương hiệu lẫn triển khai tăng trưởng.',
      footerAbout: 'Brand Marketing Manager — kết nối chiến lược thương hiệu với triển khai, vận hành, dữ liệu và kết quả kinh doanh thực tế.',
      footerCol3: ['My Story', 'Case Study', 'Liên hệ'],
    },
    en: {
      ...content['portfolio-main'].en,
      description: 'Hiring portfolio of Nguyen Dinh Duc — Brand Marketing Manager with experience in brand strategy, campaign execution, content direction, and AI workflow across multiple industries.',
      menu: ['My Story', 'Case Study', 'Projects', 'Capabilities', 'Contact'],
      resume: 'View Resume',
      eyebrow: 'Hiring Portfolio · Brand Marketing · 2026',
      heroBios: [
        'I am Nguyen Dinh Duc — a Brand Marketing Manager with 6+ years of experience leading brands for multi-brand businesses across home appliances, interiors, real estate, and consumer brands.',
        'My strength is connecting brand thinking with hands-on execution: strategy, content, KOL/KOC, social, e-commerce, production management, data analysis, and business performance tracking.',
      ],
      heroFitTitle: 'Best fit for:',
      heroFitItems: ['Brand Marketing Manager', 'Marketing Lead', 'Branding Team Lead', 'Campaign Lead'],
      quickConnect: 'Quick contact',
      heroMetaLabels: ['Location', 'Target role'],
      heroMetaValues: ['Hai Ba Trung, Hanoi', 'Brand Lead · Marketing Lead · Branding'],
      aboutHeading: 'From a technical background to <span class="serif-it">brand leadership</span>.',
      aboutParagraphs: [
        'I started from a civil engineering foundation, then shifted into marketing through agency work, event production, and brand execution. That transition shaped a highly structured working style, resilience under execution pressure, and comfort with managing multiple streams at once.',
        'Across more than 6 years, I have grown through roles from account and creative planner to brand marketing executive, marketing manager, and team leader. My journey through Cooken Agency, UKG Group, Bell Home, and Ladi Group trained me to shape brand direction while also organizing delivery across social, KOL/KOC, trade, production, and e-commerce.',
        'My career goal is to continue growing into Brand Marketing Lead or Marketing Manager roles, where I can use my strengths in content, data analysis, and communications strategy to create sustainable brand value.',
      ],
      workHeading: '4 <span class="serif-it">case studies</span> to review first',
      workNote: 'These are the 4 projects I would prioritize in job applications because they show strategy, execution, resource management, system building, and business impact most clearly.',
      caseLabels: ['Role', 'Scale', 'Strength', 'Role', 'Model', 'Strength', 'Role', 'Target', 'Strength', 'Role', 'Outcome', 'Strength'],
      caseValues: [
        'Marketing Team Leader', 'Tet 2023 · 10B VND budget', '360 Campaign · KOC/KOL · Trade',
        'Marketing Manager', 'Multi-brand ecosystem', 'Brand Architecture · Growth',
        'Planning & Execution', '2B VND / 6 months', 'TikTok Shop · Livestream',
        'Marketing Team Leader', '0 → 300M VND / month', 'Build Channel · Social Commerce',
      ],
      caseParagraphs: [
        'One of the largest campaigns I have worked on, launched for Tet in a highly competitive air-fryer market where the brand needed a truly distinctive message.',
        'I coordinated the communications plan, worked with production, creative, trade marketing, and KOC/KOL partners to deliver the campaign consistently across touchpoints.',
        'This project strongly reflects my ability to manage large campaigns, control budget, align multiple stakeholders, and stay close to business outcomes.',
        'Ladi Group is a strong example of how I work with a multi-sector model: building a shared brand framework while preserving distinct identities for agency, homestay, and expansion units.',
        'My role went beyond content or social. I helped unify brand direction, organize resources, connect partners, and build a marketing model that could run sustainably.',
        'According to my CV, this was also the period when I helped grow Ladi Homestay from 0 to 10 properties in 6 months, with revenue increasing about 10% month over month.',
        'This project highlights my ability to operate content and sales on TikTok Shop in FMCG, where brand guidelines are strict but revenue pressure is equally real.',
        'I contributed to both planning and execution, with a core focus on running the livestream sales channel toward a 2B VND target within 6 months.',
        'The case shows my ability to balance branding, content production, and conversion performance on social commerce platforms.',
        'Bell Home is a strong system-building case: team, content, sales channels, advertising, tracking, and operating process for both social and e-commerce.',
        'I developed a direction that balanced branding and performance, while organizing TikTok, livestream, KOL/KOC, and Shopee around clear revenue targets.',
        'Based on CV data, online revenue grew from zero to 300M VND/month, brand reach increased from 10K to 500K/month, and total company sales rose by 10–15% each month.',
      ],
      caseButtons: ['View case study', 'View case study', 'View case study', 'View case study'],
      projectsTag: '/Additional Projects',
      projectsHeading: 'Additional <span class="serif-it">projects</span>',
      projectNote: 'This section broadens the view on category diversity and shows how I adapt across social content, activation, F&B, e-commerce, and brand communication.',
      projectParagraphs: [
        'Built social content for VinFast with a focus on youthful, approachable, and shareable electric-mobility storytelling. The project shows how I translate technical products into accessible lifestyle content.',
        'Developed campaign content for Pho De Nhat by turning its brand story and food experience into content that felt familiar, culturally close, and still strong enough to create buzz on Facebook and TikTok.',
        'Concepted and coordinated production for motion-based digital shelf talkers at point of sale. This project reflects my ability to turn a creative idea into a final real-world asset.',
        'Produced and edited advertising videos for Lazada’s major sale events. The work demonstrates fast execution, strong brand-guideline discipline, and asset optimization for multiple placements.',
        'Built brand strategy and communications content for a marine eco-tourism project. The work shows my ability to craft brand stories and positioning for local destination models.',
        'Created brand content for Catier Pet Food with a playful, memorable, and community-friendly tone. This project shows my ability to adapt to a very different tone of voice from traditional FMCG.',
      ],
      toolsTag: '/Core Capability',
      toolsHeading: 'What I <span class="serif-it">do best</span>',
      toolsNote: 'I am best suited to roles that require both brand thinking and structured execution, team leadership, and cross-functional coordination.',
      educationTag: '/Education',
      educationHeading: 'Educational <span class="serif-it">foundation & skills</span>',
      testimonialsNote: 'I keep this section concise so recruiters can scan quickly while still understanding how I work in real projects.',
      testimonialQuotes: [
        'Duc is strong at linking strategic thinking with practical execution. His key strength is managing many moving parts while still staying anchored to business goals.',
        'Duc brings a structured, goal-driven, and highly operable marketing approach. He does not stop at ideas; he turns direction into an executable plan.',
        'Duc picks up briefs quickly, asks the right questions, and keeps output quality steady. I especially value how well he coordinates creative, production, and client stakeholders.',
      ],
      ctaHeading: 'Ready for the <span class="serif-it">next role</span>.',
      ctaSub: 'I am looking for Brand Marketing Manager, Marketing Lead, or Branding Team Lead opportunities in Hanoi or hybrid settings, where I can contribute to both brand strategy and growth execution.',
      footerAbout: 'Brand Marketing Manager — connecting brand strategy with execution, operations, data, and real business results.',
      footerCol3: ['My Story', 'Case Study', 'Contact'],
    },
  };

  const setText = (selector, value) => {
    const el = document.querySelector(selector);
    if (el && value != null) el.textContent = value;
  };
  const setHTML = (selector, value) => {
    const el = document.querySelector(selector);
    if (el && value != null) el.innerHTML = value;
  };
  const setButtonText = (selector, values) => {
    document.querySelectorAll(selector).forEach((el, index) => {
      const value = Array.isArray(values) ? values[index] : values;
      if (value == null) return;
      const bolt = el.querySelector('.bolt');
      el.innerHTML = `${value}${bolt ? ` ${bolt.outerHTML}` : ''}`;
    });
  };
  const setEyebrow = (value) => {
    const el = document.querySelector('.eyebrow');
    if (el && value != null) el.innerHTML = `<span class="dot"></span>${value}`;
  };
  const setAllText = (selector, values) => {
    document.querySelectorAll(selector).forEach((el, index) => {
      if (values[index] != null) el.textContent = values[index];
    });
  };
  const setAllHTML = (selector, values) => {
    document.querySelectorAll(selector).forEach((el, index) => {
      if (values[index] != null) el.innerHTML = values[index];
    });
  };

  function applyLanguage(lang) {
    const data = content[page]?.[lang];
    if (!data) return;

    document.documentElement.lang = lang === 'en' ? 'en' : 'vi';
    document.body.dataset.lang = lang;
    localStorage.setItem(`portfolio-lang-${page}`, lang);
    buttons.forEach((button) => button.classList.toggle('is-active', button.dataset.lang === lang));

    document.title = data.title;
    if (metaDescription) metaDescription.setAttribute('content', data.description);

    setAllText('nav .menu a', data.menu);
    setButtonText('nav .btn.btn-amber', data.resume);
    setEyebrow(data.eyebrow);
    setText('.display > span:nth-child(1) .hero-lift', data.heroLead1);
    setText('.display > span:nth-child(2) .hero-lift .serif-it', data.heroLead2.replace('.', ''));
    const h1Second = document.querySelector('.display > span:nth-child(2) .hero-lift');
    if (h1Second) h1Second.innerHTML = `<span class="serif-it">${data.heroLead2}</span>`;
    setText('.hero-role .role-title', data.heroRole);
    setAllText('.hero-bio p .hero-lift', data.heroBios || [data.heroBio]);
    setText('.hero-fit > span', data.heroFitTitle);
    if (data.heroFitItems) setAllText('.hero-fit-list span', data.heroFitItems);
    setText('.hero-strip > span', data.quickConnect);
    setAllText('.hero-strip .sicons a', data.heroLinks);
    setAllText('.hero-meta .label', data.heroMetaLabels);
    setAllText('.hero-meta .value', data.heroMetaValues);
    setText('.steps span:last-child', data.aboutStep);
    setHTML('.about-left h2', data.aboutHeading);
    setAllHTML('.about-left p', data.aboutParagraphs);
    setAllText('.stat-card .lab', data.stats);
    document.querySelectorAll('.stat-card .num').forEach((el, index) => {
      if (data.statNumbers?.[index] != null) {
        el.dataset.to = data.statNumbers[index];
      }
      if (data.statSuffixes?.[index] != null) {
        el.dataset.suffix = data.statSuffixes[index];
      }
      const current = Number(el.dataset.to || data.statNumbers?.[index] || 0);
      const suffix = el.dataset.suffix || '';
      el.innerHTML = `${current}${suffix}`;
    });
    setHTML('.brands .brand-head h2', data.brandsHeading);
    setText('.brands .brand-head p', data.brandsDesc);
    setHTML('.work-head h2', data.workHeading);
    setText('.work-head .section-note', data.workNote);
    setAllText('.case .case-meta .label', data.caseLabels);
    setAllText('.case .case-meta .value', data.caseValues);
    setAllText('.case .case-body h3', data.caseTitles);
    setAllText('.case .case-body p', data.caseParagraphs);
    setButtonText('.case .case-body .btn.btn-amber', data.caseButtons);
    setText('.proj-section-head .tag', data.projectsTag);
    setHTML('.proj-section-head h2', data.projectsHeading);
    setText('.proj-section-head .section-note', data.projectNote);
    setAllText('.proj-card-body h3', data.projectTitles);
    setAllText('.proj-card-body p', data.projectParagraphs);
    setButtonText('.proj-card-body .btn-proj', data.projectButtons);
    setText('.tools .method-head:nth-of-type(1) .tag', data.toolsTag);
    setHTML('.tools .method-head:nth-of-type(1) h2', data.toolsHeading);
    setText('.tools .method-head:nth-of-type(1) .section-note', data.toolsNote);
    setText('.tools .method-head:nth-of-type(2) .tag', data.educationTag);
    setHTML('.tools .method-head:nth-of-type(2) h2', data.educationHeading);
    setText('.testi-head .tag', data.testimonialsTag);
    setHTML('.testi-head h2', data.testimonialsHeading);
    setText('.testi-head .section-note', data.testimonialsNote);
    setAllText('.tquote p', data.testimonialQuotes);
    setAllText('.tquote .name', data.testimonialNames);
    setAllText('.tquote .pos', data.testimonialRoles);
    setText('.cta-stage .tag', data.ctaTag);
    setHTML('.cta-stage h2', data.ctaHeading);
    setText('.cta-stage .sub', data.ctaSub);
    setAllText('.cta-meta .label', data.ctaLabels);
    setAllText('.cta-meta .value', data.ctaValues);
    setText('footer .foot-top > div:first-child p', data.footerAbout);
    setAllText('footer .foot-col h4', data.footerHeadings);
    setAllText('footer .foot-col:nth-child(2) a', data.footerCol2);
    setAllText('footer .foot-col:nth-child(3) a', data.footerCol3);
    setAllText('footer .foot-col:nth-child(4) a', data.footerCol4);
    setAllText('footer .foot-bot small', data.footerSmall);
    setAllText('.testi-nav .testi-btn', data.testiButtons);
    const prev = document.getElementById('testiBtnPrev');
    const next = document.getElementById('testiBtnNext');
    if (prev) prev.setAttribute('aria-label', data.testiButtons[0]);
    if (next) next.setAttribute('aria-label', data.testiButtons[1]);
  }

  buttons.forEach((button) => {
    button.addEventListener('click', () => applyLanguage(button.dataset.lang));
  });

  const initialLang = localStorage.getItem(`portfolio-lang-${page}`) || 'vi';
  applyLanguage(initialLang);
})();

// language switch for case-study pages
(function () {
  if (!document.body.classList.contains('case-page')) return;

  const pageKey = decodeURIComponent(location.pathname.split('/').pop() || '');
  const navBar = document.querySelector('nav .bar');
  const navAction = navBar?.querySelector('.btn.btn-amber');
  if (!navBar || !navAction) return;

  let switcher = navBar.querySelector('[data-lang-switch]');
  if (!switcher) {
    switcher = document.createElement('div');
    switcher.className = 'lang-switch';
    switcher.setAttribute('data-lang-switch', '');
    switcher.setAttribute('aria-label', 'Language switch');
    switcher.innerHTML = '<button type="button" class="lang-btn is-active" data-lang="vi">VI</button><button type="button" class="lang-btn" data-lang="en">EN</button>';
    navBar.insertBefore(switcher, navAction);
  }

  const buttons = Array.from(switcher.querySelectorAll('[data-lang]'));
  const metaDescription = document.querySelector('meta[name="description"]');

  const getButtonLabel = (el) => {
    if (!el) return '';
    const clone = el.cloneNode(true);
    clone.querySelectorAll('.bolt').forEach((node) => node.remove());
    return clone.textContent.replace(/\s+/g, ' ').trim();
  };

  const setButtonLabel = (el, value) => {
    if (!el || value == null) return;
    const bolt = el.querySelector('.bolt');
    el.innerHTML = `${value}${bolt ? ` ${bolt.outerHTML}` : ''}`;
  };

  const setTextList = (selector, values) => {
    document.querySelectorAll(selector).forEach((el, index) => {
      if (values[index] != null) el.textContent = values[index];
    });
  };

  const setHTMLList = (selector, values) => {
    document.querySelectorAll(selector).forEach((el, index) => {
      if (values[index] != null) el.innerHTML = values[index];
    });
  };

  const commonVi = {
    menu: ['Giới thiệu', 'Thương hiệu', 'Dự án nổi bật', 'Dự án', 'Liên hệ'],
    eyebrow: 'Chi tiết dự án',
    footer: ['© 2026 Duc Nguyen Portfolio', 'Brand Marketing · Campaign Strategy · Content Direction'],
  };

  const viSnapshot = {
    title: document.title,
    description: metaDescription?.getAttribute('content') || '',
    heroTitle: document.querySelector('.case-copy .display')?.innerHTML || '',
    heroLead: document.querySelector('.case-lead')?.textContent.trim() || '',
    tags: Array.from(document.querySelectorAll('.case-tags span')).map((el) => el.textContent.trim()),
    channelTags: Array.from(document.querySelectorAll('.case-channel-tags a')).map((el) => el.textContent.trim()),
    summaryLabels: Array.from(document.querySelectorAll('.case-summary-card .label')).map((el) => el.textContent.trim()),
    summaryValues: Array.from(document.querySelectorAll('.case-summary-card .value')).map((el) => el.textContent.trim()),
    storyHeadings: Array.from(document.querySelectorAll('.case-story h2')).map((el) => el.innerHTML),
    storyParagraphs: Array.from(document.querySelectorAll('.case-story p')).map((el) => el.textContent.trim()),
    highlights: Array.from(document.querySelectorAll('.case-highlights li')).map((el) => el.textContent.trim()),
    highlightCaptions: Array.from(document.querySelectorAll('.case-highlight-gallery figcaption')).map((el) => el.textContent.trim()),
    navBack: getButtonLabel(navAction),
    actionPrimary: getButtonLabel(document.querySelector('.case-actions .btn.btn-amber')),
    actionSecondary: document.querySelector('.case-actions .btn-outline')?.textContent.trim() || '',
    nextHeading: document.querySelector('.case-next-panel h2')?.innerHTML || '',
    nextButton: getButtonLabel(document.querySelector('.case-next-panel .btn.btn-amber')),
  };

  const caseI18n = {
    'bell-home-xay-kenh-online-tu-con-so-0.html': {
      vi: {
        navBack: 'Quay lại Dự án nổi bật',
        actionPrimary: 'Quay lại Dự án nổi bật',
        actionSecondary: 'Liên hệ',
        nextHeading: 'Muốn xem thêm <span class="serif-it">dự án tiêu biểu</span>?',
        nextButton: 'Xem portfolio',
        channelTags: ['TikTok BellHome', 'Facebook BellHomes', 'Website BellHomes'],
      },
      en: {
        title: 'Bell Home - Building an Online Channel from Zero | Duc Nguyen',
        description: "Case study for Bell Home - building an online sales channel from zero in Duc Nguyen's brand marketing portfolio.",
        menu: ['About', 'Brands', 'Featured Work', 'Projects', 'Contact'],
        navBack: 'Back to Featured Work',
        eyebrow: 'Project Detail',
        heroTitle: 'Bell Home <span class="serif-it">Online Channel</span>',
        heroLead: "Built Bell Home's online business system from the ground up: team, content, sales channels, advertising, tracking, and operating workflows across Shopee and TikTok Shop.",
        tags: ['Marketing Team Leader', '2024-2025', 'Consumer Goods'],
        channelTags: ['BellHome TikTok', 'BellHomes Facebook', 'BellHomes Website'],
        summaryLabels: ['Role', 'Timeline', 'Category'],
        summaryValues: ['Marketing Team Leader', '2024-2025', 'Consumer Goods'],
        storyHeadings: ['Context & <span class="serif-it">role</span>', 'Key <span class="serif-it">highlights</span>', 'Want to see more <span class="serif-it">featured work</span>?'],
        storyParagraphs: [
          'Built the online business system from scratch: team structure, content, sales channels, advertising, tracking, and operating processes across Shopee and TikTok Shop.',
          'Balanced branding and performance so the detergent product line could both gain stronger recognition and prove commercial impact.',
          'Execution focused on Facebook, TikTok Shop, Shopee, livestream commerce, and KOL/KOC review content.',
        ],
        highlights: [
          'Built a TikTok channel reaching 50,000-200,000 monthly views and grew it by 20K followers within 5 months.',
          'Joined live selling sessions with well-known KOLs/KOCs, delivering average sales of 15-25 million VND per session.',
          'Organized daily and mega livestreams generating 150-200 million VND per month on average, with a peak of 300 million VND across the active e-commerce channels.',
          'Built a production workflow for 30+ videos per month and managed a 10-15 person team covering content, sales channels, advertising, and tracking.',
        ],
        highlightCaptions: ['BellHome TikTok channel', 'BellHome Facebook channel', 'KOL/KOC live sessions to drive revenue'],
        actionPrimary: 'Back to Featured Work',
        actionSecondary: 'Contact',
        nextHeading: 'Want to see more <span class="serif-it">featured work</span>?',
        nextButton: 'View portfolio',
        footer: ['© 2026 Duc Nguyen Portfolio', 'Brand Marketing · Campaign Strategy · Content Direction'],
      },
    },
    'catier-brand-do-an-cho-thu-cung.html': {
      vi: { navBack: 'Quay lại Dự án', actionPrimary: 'Quay lại Dự án', actionSecondary: 'Liên hệ' },
      en: {
        title: 'Catier - Pet Food Brand Content | Duc Nguyen',
        description: "Case study for Catier pet food brand content in Duc Nguyen's brand marketing portfolio.",
        menu: ['About', 'Brands', 'Featured Work', 'Projects', 'Contact'],
        navBack: 'Back to Projects',
        eyebrow: 'Project Detail',
        heroTitle: 'Catier <span class="serif-it">Pet Food</span>',
        heroLead: 'A brand content project for Catier Pet Food, focused on fresh pet meals with playful, memorable visuals that feel close to pet-owner communities.',
        tags: ['Brand Content', 'Pet Food', 'Social Visual'],
        summaryLabels: ['Brand', 'Role', 'Category'],
        summaryValues: ['Catier', 'Brand Content', 'Pet Food'],
        storyHeadings: ['Context & <span class="serif-it">role</span>', 'Execution <span class="serif-it">scope</span>', 'Key <span class="serif-it">highlights</span>'],
        storyParagraphs: [
          'Catier needed a visual and content system that made fresh pet food feel more recognizable, easier to understand, and fun enough to stand out on social platforms.',
          'I helped shape the content direction, highlighting fresh ingredients, combo offers, and lovable pet imagery to improve brand recall.',
          'The asset system included social posters, product visuals, and sales messages built around combo bundles. The palette stayed bright and high-contrast, combining pets and products to create a friendly tone.',
        ],
        highlights: [
          'Built a playful and memorable visual language for a pet food brand.',
          'Pushed the message of 100% fresh ingredients and promotional combos to support sales.',
          'Created social assets suitable for posts, ads, and product introduction content.',
        ],
        actionPrimary: 'Back to Projects',
        actionSecondary: 'Contact',
        footer: ['© 2026 Duc Nguyen Portfolio', 'Brand Marketing · Campaign Strategy · Content Direction'],
      },
    },
    'colgate-multi-product-content-campaign.html': {
      vi: { navBack: 'Quay lại Dự án', actionPrimary: 'Quay lại Dự án', actionSecondary: 'Liên hệ' },
      en: {
        title: 'Colgate - Multi-product Content Campaign | Duc Nguyen',
        description: "Case study for Colgate's multi-product TikTok branding and e-commerce campaign in Duc Nguyen's portfolio.",
        menu: ['About', 'Brands', 'Featured Work', 'Projects', 'Contact'],
        navBack: 'Back to Projects',
        eyebrow: 'Project Detail',
        heroTitle: 'Colgate <span class="serif-it">Content Campaign</span>',
        heroLead: 'A marketing campaign for Colgate on TikTok, combining both branding and e-commerce. Key products included Colgate Optic, Total, Purple, and other priority SKUs.',
        tags: ['Planning & Execution', 'TikTok Shop', 'FMCG / Oral Care'],
        summaryLabels: ['Brand', 'Role', 'Agency'],
        summaryValues: ['Colgate', 'Planning & Execution', 'Cooken Agency'],
        storyHeadings: ['Context & <span class="serif-it">role</span>', 'Execution <span class="serif-it">scope</span>', 'Key <span class="serif-it">highlights</span>'],
        storyParagraphs: [
          'The campaign was deployed on TikTok with two parallel goals: build brand awareness and drive sales on TikTok Shop.',
          'My role covered both planning and execution. The main focus I owned was TikTok Shop sales deployment, with a revenue target of 2 billion VND over 6 months for the livestream channel.',
          'I worked closely with the production team to create video ad assets and branding content, making sure the content stayed on-brand while still effective for conversion.',
          'The priority products included Colgate toothpaste lines such as Optic, Total, Purple, and other oral care items pushed on TikTok.',
          'The content system was split across multiple groups: video ads, branding content, livestream selling, KOC/KOL-oriented assets, and content supporting discovery, recommendation, and conversion on TikTok Shop.',
        ],
        highlights: [
          'Deployed a TikTok campaign combining branding and e-commerce for Colgate toothpaste product lines.',
          'Owned TikTok Shop deployment and livestream selling with a 2 billion VND target over 6 months.',
          'Coordinated with production to create video ads and branding content across multiple content touchpoints.',
          'Managed the workflow from planning and briefing to asset production and campaign delivery.',
        ],
        actionPrimary: 'Back to Projects',
        actionSecondary: 'Contact',
        footer: ['© 2026 Duc Nguyen Portfolio', 'Brand Marketing · Campaign Strategy · Content Direction'],
      },
    },
    'dalat-hasfarm-digital-shelf-talker.html': {
      vi: { navBack: 'Quay lại Dự án', actionPrimary: 'Quay lại Dự án', actionSecondary: 'Liên hệ' },
      en: {
        title: 'Dalat Hasfarm - Digital Shelf Talker | Duc Nguyen',
        description: "Case study for Dalat Hasfarm's motion-based digital shelf talker retail project.",
        menu: ['About', 'Brands', 'Featured Work', 'Projects', 'Contact'],
        navBack: 'Back to Projects',
        eyebrow: 'Project Detail',
        heroTitle: 'Dalat Hasfarm <span class="serif-it">Shelf Talker</span>',
        heroLead: 'A motion-based Digital Shelf Talker at the point of sale, developed from the NewTab proposal together with source image sets, flowers, and motion demos for Dalat Hasfarm stores.',
        tags: ['Digital Production', 'Retail Activation', 'Motion Asset'],
        summaryLabels: ['Brand', 'Role', 'Channel'],
        summaryValues: ['Dalat Hasfarm', 'Concept & Production', 'Point of Sale'],
        storyHeadings: ['Context & <span class="serif-it">role</span>', 'Execution <span class="serif-it">scope</span>', 'Key <span class="serif-it">highlights</span>'],
        storyParagraphs: [
          'The "Digital Shelf Talker DLHF x NewTab" proposal aimed to turn display screens into a stronger brand touchpoint: reinforcing Dalat Hasfarm as a trusted flower brand with 30+ years of heritage while keeping the in-store content youthful and eye-catching.',
          'I contributed on concept, asset coordination, and motion production collaboration, covering logos, backgrounds, flower sources, female model assets, and demo videos such as 0303, 0626, and 0626v2.',
          'Video 1 followed a brand-authority direction: "No.1 fresh flowers in Asia Pacific," with logo and tagline pop-ups at the center, flowers changing through motion effects, and a closing CTA urging shoppers to bring flowers home.',
          'Video 3 followed a more social-trend direction: "Beautiful flowers say hi – Shine every day," using a slideshow of 5-6 model photos with flowers, diversified product pop-ups, and an interactive prompt asking which flower suits you best.',
        ],
        highlights: [
          'Blended long-term brand messaging with a short, eye-catching format suitable for in-store screens.',
          'Turned static source assets such as logos, flowers, model imagery, and backgrounds into fast-rhythm motion assets.',
          'Designed content with a clear CTA so the screen did more than look good — it also supported purchase decisions in-store.',
        ],
        actionPrimary: 'Back to Projects',
        actionSecondary: 'Contact',
        footer: ['© 2026 Duc Nguyen Portfolio', 'Brand Marketing · Campaign Strategy · Content Direction'],
      },
    },
    'kalite-campaign-tet-khong-dau-thi-se-giau.html': {
      vi: {
        navBack: 'Quay lại Dự án nổi bật',
        actionPrimary: 'Quay lại Dự án nổi bật',
        actionSecondary: 'Liên hệ',
        nextHeading: 'Muốn xem thêm <span class="serif-it">dự án tiêu biểu</span>?',
        nextButton: 'Xem portfolio',
      },
      en: {
        title: 'Kalite - Tet Campaign "No Oil, More Prosperity" | Duc Nguyen',
        description: "Case study for Kalite's Tet 2023 multi-platform campaign in Duc Nguyen's portfolio.",
        menu: ['About', 'Brands', 'Featured Work', 'Projects', 'Contact'],
        navBack: 'Back to Featured Work',
        eyebrow: 'Project Detail',
        heroTitle: 'Kalite <span class="serif-it">No Oil, More Prosperity</span>',
        heroLead: 'Tet 2023 campaign for Kalite, executed from September 2022 to April 2023 across multiple platforms. At the time, it was one of the largest campaigns in the home appliance market.',
        tags: ['Marketing Team Leader', 'Tet 2023', 'Home Appliances'],
        summaryLabels: ['Role', 'Scale', 'Category'],
        summaryValues: ['Marketing Team Leader', 'Tet 2023 · 10B VND budget', 'Home Appliances'],
        storyHeadings: ['Context & <span class="serif-it">role</span>', 'Key <span class="serif-it">highlights</span>', 'Want to see more <span class="serif-it">featured work</span>?'],
        storyParagraphs: [
          'I took part in executing the Tet campaign for Kalite in a market where air fryers were already highly competitive.',
          'I coordinated the communications plan, production agency, creative team, trade marketing, and performance tracking across multiple touchpoints.',
          'I also worked with other partners to create lucky-scratch, online and offline lucky-draw programs, and to execute those sales-promotion activities.',
          'In parallel, I booked and managed the communications rollout with KOCs and KOLs.',
        ],
        highlights: [
          'Managed a campaign budget of up to 10 billion VND for peak Tet season execution.',
          'Booked up to 200 KOCs during the campaign period.',
          'Group revenue increased 30% compared with the previous quarter of 2022.',
          'Managed social media content for the Kalite brand, ensuring consistency in both tone of voice and visual identity.',
        ],
        actionPrimary: 'Back to Featured Work',
        actionSecondary: 'Contact',
        nextHeading: 'Want to see more <span class="serif-it">featured work</span>?',
        nextButton: 'View portfolio',
        footer: ['© 2026 Duc Nguyen Portfolio', 'Brand Marketing · Campaign Strategy · Content Direction'],
      },
    },
    'kalite-product-communication-may-ep-cham.html': {
      vi: {
        navBack: 'Quay lại Dự án nổi bật',
        actionPrimary: 'Quay lại Dự án nổi bật',
        actionSecondary: 'Liên hệ',
        nextHeading: 'Muốn xem thêm <span class="serif-it">dự án tiêu biểu</span>?',
        nextButton: 'Xem portfolio',
      },
      en: {
        title: 'Kalite - Slow Juicer Product Communication | Duc Nguyen',
        description: "Case study for Kalite's slow juicer product communication project in Duc Nguyen's portfolio.",
        menu: ['About', 'Brands', 'Featured Work', 'Projects', 'Contact'],
        navBack: 'Back to Featured Work',
        eyebrow: 'Project Detail',
        heroTitle: 'Kalite <span class="serif-it">Slow Juicer</span>',
        heroLead: "Built product communication for Kalite's slow juicer line, focusing on health benefits, a multi-channel content system, and strong presence at the point of sale.",
        tags: ['Product Communication', 'Trade Marketing', 'Home Appliances'],
        summaryLabels: ['Brand', 'Role', 'Category'],
        summaryValues: ['Kalite', 'Product Communication', 'Home Appliances'],
        storyHeadings: ['Context & <span class="serif-it">role</span>', 'Key <span class="serif-it">highlights</span>', 'Want to see more <span class="serif-it">featured work</span>?'],
        storyParagraphs: [
          "I joined the communication development for Kalite's slow juicer line during a phase when the product needed stronger awareness and clearer market positioning.",
          'I built a content system around product benefits, aligning online, offline, and trade marketing so the same message could travel across multiple touchpoints.',
          'The goal was to keep the message consistent across content, POSM, e-commerce, and the dealer network.',
        ],
        highlights: [
          "Kalite reached the No.1 position in Vietnam's slow juicer market in 2022.",
          'Received the Contribution Award at UKG Group.',
          'Integrated content, POSM, e-commerce, and the dealer system under one communication direction.',
        ],
        actionPrimary: 'Back to Featured Work',
        actionSecondary: 'Contact',
        nextHeading: 'Want to see more <span class="serif-it">featured work</span>?',
        nextButton: 'View portfolio',
        footer: ['© 2026 Duc Nguyen Portfolio', 'Brand Marketing · Campaign Strategy · Content Direction'],
      },
    },
    'ladi-group-multi-brand-ecosystem.html': {
      vi: {
        navBack: 'Quay lại Dự án nổi bật',
        actionPrimary: 'Quay lại Dự án nổi bật',
        actionSecondary: 'Liên hệ',
        nextHeading: 'Muốn xem thêm <span class="serif-it">dự án tiêu biểu</span>?',
        nextButton: 'Xem portfolio',
      },
      en: {
        title: 'Ladi Group - Multi-brand Ecosystem | Duc Nguyen',
        description: "Case study for Ladi Group's multi-brand ecosystem in Duc Nguyen's brand marketing portfolio.",
        menu: ['About', 'Brands', 'Featured Work', 'Projects', 'Contact'],
        navBack: 'Back to Featured Work',
        eyebrow: 'Project Detail',
        heroTitle: 'Ladi Group <span class="serif-it">Multi-brand Ecosystem</span>',
        heroLead: 'Ladi Group is a multi-sector business covering agency, staycation, and real estate. Founded in 2023 with agency as its core strength, it later expanded into real estate and homestay.',
        tags: ['Marketing Manager', '2025-2026', 'Travel · Agency · Real Estate'],
        summaryLabels: ['Role', 'Timeline', 'Category'],
        summaryValues: ['Marketing Manager', '2025-2026', 'Travel · Agency · Real Estate'],
        storyHeadings: ['Context & <span class="serif-it">role</span>', 'Key <span class="serif-it">highlights</span>', 'Want to see more <span class="serif-it">featured work</span>?'],
        storyParagraphs: [
          'As Marketing Manager, I was responsible for the overall brand direction, content development, partner collaboration, and a consistent brand experience.',
          'I built a clear umbrella-brand framework while still preserving the identity of each business unit in the Ladi Group ecosystem.',
          'My primary focus was the agency business, which accounted for roughly 70% of the workload, while Airbnb Homestay covered around 30%.',
          'I also deployed marketing projects for clients, developers, and contractors in the Hoan Kiem area, including projects connected with Vinhomes Royal Island and Vinhomes Vu Yen.',
        ],
        highlights: [
          'Led a multi-sector ecosystem spanning agency, staycation, real estate, and homestay.',
          'Developed partnership programs between Ladi Group and tourist operators, hotels, and bars in Hanoi.',
          'Built the Ladi Homestay chain from 0 to 10 units within 6 months.',
          'Monthly revenue grew by 10% during the chain development phase.',
        ],
        actionPrimary: 'Back to Featured Work',
        actionSecondary: 'Contact',
        nextHeading: 'Want to see more <span class="serif-it">featured work</span>?',
        nextButton: 'View portfolio',
        footer: ['© 2026 Duc Nguyen Portfolio', 'Brand Marketing · Campaign Strategy · Content Direction'],
      },
    },
    'lang-nuoi-bien-van-don-thuong-hieu-diem-den.html': {
      vi: { navBack: 'Quay lại Dự án', actionPrimary: 'Quay lại Dự án', actionSecondary: 'Liên hệ' },
      en: {
        title: 'Van Don Sea Village - Destination Branding | Duc Nguyen',
        description: "Case study for Van Don Sea Village destination branding in Duc Nguyen's portfolio.",
        menu: ['About', 'Brands', 'Featured Work', 'Projects', 'Contact'],
        navBack: 'Back to Projects',
        eyebrow: 'Project Detail',
        heroTitle: 'Vân Đồn <span class="serif-it">Destination Brand</span>',
        heroLead: 'Brand strategy for Van Don Sea Village: from the farming-origin story and flagship model in Hanoi to a premium seafood distribution system.',
        tags: ['Brand Planning', 'Destination Story', 'B2B2C'],
        summaryLabels: ['Brand', 'Role', 'Category'],
        summaryValues: ['Van Don Sea Village', 'Brand Strategy', 'Tourism · Premium Seafood'],
        storyHeadings: ['Context & <span class="serif-it">role</span>', 'Execution <span class="serif-it">scope</span>', 'Key <span class="serif-it">highlights</span>'],
        storyParagraphs: [
          'The project document describes Van Don as a marine area with a rich ecosystem, clear water, stable salinity, and a long-standing aquaculture tradition. Yet local farmers still faced unstable buying prices, trader pressure, and a lack of a fair consumption ecosystem.',
          'From that context, I developed the brand story "From the ocean to the dining table – A result of passion," positioning the project as a sustainable and professional distribution system for premium seafood from Van Don to the Hanoi market.',
          'Phase 1 focused on the first 12 months of retail and organized wholesale in major northern urban centers, especially Hanoi. Resource allocation prioritized 70% retail, 20% organized wholesale, and 10% official export testing.',
          'The flagship model at 107 Nguy Nhu Kon Tum, Thanh Xuan was designed as a 1,000 m² distribution, processing, and experience space with live seafood display, processed products, open kitchen, à la carte dining, all-day buffet, and logistics support.',
          'The long-term direction was to replicate the model in Ho Chi Minh City, Da Nang, Hai Phong, and premium tourism zones while integrating traceability and storytelling into each dish to represent premium Vietnamese seafood.',
        ],
        highlights: [
          "Turned a seafood distribution proposal into a brand story with emotional depth: sustainable from the farming area to the consumer's heart.",
          'Combined brand strategy, flagship retail model, retail/B2B2C channels, and food experience into one integrated system.',
          'Clarified Hanoi/Thanh Xuan as a strategic advantage: dense residential and office populations, strong purchasing power, and room for a premium seafood concept.',
        ],
        actionPrimary: 'Back to Projects',
        actionSecondary: 'Contact',
        footer: ['© 2026 Duc Nguyen Portfolio', 'Brand Marketing · Campaign Strategy · Content Direction'],
      },
    },
    'lazada-video-campaign-ngay-sale-lon.html': {
      vi: { navBack: 'Quay lại Dự án', actionPrimary: 'Quay lại Dự án', actionSecondary: 'Liên hệ' },
      en: {
        title: 'Lazada - Major Sale Video Campaign | Duc Nguyen',
        description: "Case study for Lazada's large-sale video campaign production in Duc Nguyen's portfolio.",
        menu: ['About', 'Brands', 'Featured Work', 'Projects', 'Contact'],
        navBack: 'Back to Projects',
        eyebrow: 'Project Detail',
        heroTitle: 'Lazada <span class="serif-it">Sale Campaign</span>',
        heroLead: 'A video campaign project for Lazada involving a large volume of footage, multi-category voice-over, and a completed 16:9 master video for a major sale season.',
        tags: ['Campaign Video', 'E-commerce', 'Sale Creative'],
        summaryLabels: ['Brand', 'Role', 'Category'],
        summaryValues: ['Lazada', 'Video Production', 'E-commerce'],
        storyHeadings: ['Context & <span class="serif-it">role</span>', 'Execution <span class="serif-it">scope</span>', 'Key <span class="serif-it">highlights</span>'],
        storyParagraphs: [
          'The project folder shows a huge source volume: more than one hundred footage files, the final master video, and VO folders covering many product categories from electronics to home goods.',
          'I worked on campaign video production and editing, handling multiple footage sources and voice-over tracks to create short commercial content for major sale days.',
          'The work involved selecting footage, cutting to VO rhythm, ensuring the product and offer stayed clear, and keeping the editing speed suitable for e-commerce environments where users scroll quickly.',
          'Because the product range was broad, each asset needed to preserve a consistent sales structure: fast product recognition, easy-to-understand benefits, strong CTA rhythm, and the right sale-campaign energy.',
        ],
        highlights: [
          'Handled a large amount of footage and voice-over material across multiple product categories within one campaign.',
          'Optimized the video for e-commerce logic: fast, product-clear, offer-clear, and easy to convert.',
          'Maintained delivery quality despite many versions, many products, and tight sale-driven deadlines.',
        ],
        actionPrimary: 'Back to Projects',
        actionSecondary: 'Contact',
        footer: ['© 2026 Duc Nguyen Portfolio', 'Brand Marketing · Campaign Strategy · Content Direction'],
      },
    },
    'lotteria-series-chau-giang-ne.html': {
      vi: { navBack: 'Quay lại Dự án', actionPrimary: 'Quay lại Dự án', actionSecondary: 'Liên hệ' },
      en: {
        title: 'Lotteria - "Châu Giang nè" Series | Duc Nguyen',
        description: "Case study for Lotteria's \"Châu Giang nè\" social video series in Duc Nguyen's portfolio.",
        menu: ['About', 'Brands', 'Featured Work', 'Projects', 'Contact'],
        navBack: 'Back to Projects',
        eyebrow: 'Project Detail',
        heroTitle: 'Lotteria <span class="serif-it">Châu Giang nè</span>',
        heroLead: 'The "Châu Giang nè" social video series for Lotteria, built through multiple short episodes and variations around characters, situations, and quick-view pacing.',
        tags: ['Social Content', 'Video Series', 'F&B'],
        summaryLabels: ['Brand', 'Role', 'Category'],
        summaryValues: ['Lotteria', 'Script & Format', 'F&B'],
        storyHeadings: ['Context & <span class="serif-it">role</span>', 'Execution <span class="serif-it">scope</span>', 'Key <span class="serif-it">highlights</span>'],
        storyParagraphs: [
          'The WORKS folder includes multiple episode and edit versions, showing this was a social content series rather than a single deliverable.',
          'I contributed to scripting, shaping the character-driven format, and coordinating production so the content stayed entertaining, memorable, and relevant to younger audiences.',
          'The content was designed as short-form video: a fast opening situation, a character with a distinct personality, product appearances that felt natural in the story, and editing pace suited to social platforms.',
          'The work was not only about writing lines, but also about maintaining the series format so each episode felt unique while still clearly belonging to the same "Châu Giang nè" universe.',
        ],
        highlights: [
          'Built a character-led format to create recognition across multiple episodes.',
          'Coordinated production and editing rounds so the videos stayed concise, social-first, and easy to share.',
          'Connected F&B products with familiar everyday storytelling for younger customers.',
        ],
        actionPrimary: 'Back to Projects',
        actionSecondary: 'Contact',
        footer: ['© 2026 Duc Nguyen Portfolio', 'Brand Marketing · Campaign Strategy · Content Direction'],
      },
    },
    'pho-de-nhat-bi-quyet-gia-truyen.html': {
      vi: { navBack: 'Quay lại Dự án', actionPrimary: 'Quay lại Dự án', actionSecondary: 'Liên hệ' },
      en: {
        title: 'Pho De Nhat - Heritage Recipe | Duc Nguyen',
        description: "Case study for Pho De Nhat's \"heritage recipe\" campaign in Duc Nguyen's portfolio.",
        menu: ['About', 'Brands', 'Featured Work', 'Projects', 'Contact'],
        navBack: 'Back to Projects',
        eyebrow: 'Project Detail',
        heroTitle: 'Phở Đệ Nhất <span class="serif-it">Heritage Recipe</span>',
        heroLead: 'A campaign for Pho De Nhat built around the "Heritage Recipe" message and a 15-year pho story, highlighting broth flavor, ingredients, and the experience of a steaming bowl of pho.',
        tags: ['Brand Campaign', 'Video Content', 'F&B'],
        summaryLabels: ['Brand', 'Role', 'Category'],
        summaryValues: ['Pho De Nhat', 'Campaign Execution', 'F&B'],
        storyHeadings: ['Context & <span class="serif-it">role</span>', 'Execution <span class="serif-it">scope</span>', 'Key <span class="serif-it">highlights</span>'],
        storyParagraphs: [
          "My role in this project was Marketing Brand Execution: deploying campaign content on Facebook and TikTok, booking KOLs/KOCs, and helping the campaign gain heat and viral reach. The strategy stood out by turning an instant food product into a premium tasting experience on one of Hanoi's long-standing food streets.",
          'The work included developing the campaign visuals, coordinating square-video and visual production, controlling the key message, and ensuring the food looked appealing across digital channels.',
          "The asset system focused on the brand's signature red, steaming bowls of pho, direct broth-pouring visuals, and representative characters that made the campaign feel trustworthy, lively, and easy to remember.",
        ],
        highlights: [
          "Used the \"Heritage Recipe\" message clearly to strengthen the product's sense of distinction.",
          'Combined Acecook and Pho De Nhat branding with strong food imagery to build highly recognizable key visuals.',
          'Produced assets for digital campaigns, social content, and square-format video.',
        ],
        actionPrimary: 'Back to Projects',
        actionSecondary: 'Contact',
        footer: ['© 2026 Duc Nguyen Portfolio', 'Brand Marketing · Campaign Strategy · Content Direction'],
      },
    },
    'ukg-brand-film-fly-together.html': {
      vi: { navBack: 'Quay lại Dự án', actionPrimary: 'Quay lại Dự án', actionSecondary: 'Liên hệ' },
      en: {
        title: 'UKG Group - Fly Together Brand Film | Duc Nguyen',
        description: "Case study for UKG Group's 5-year anniversary brand film in Duc Nguyen's portfolio.",
        menu: ['About', 'Brands', 'Featured Work', 'Projects', 'Contact'],
        navBack: 'Back to Projects',
        eyebrow: 'Project Detail',
        heroTitle: 'UKG Group <span class="serif-it">Fly Together</span>',
        heroLead: "The brand film \"UKG FLY TOGETHER – The 5-year takeoff journey of UKG Group,\" developed as a communication asset for the company's 5-year milestone.",
        tags: ['Brand Film', 'Corporate', 'Internal Communication'],
        summaryLabels: ['Brand', 'Role', 'Category'],
        summaryValues: ['UKG Group', 'Brand Film Direction', 'Corporate'],
        storyHeadings: ['Context & <span class="serif-it">role</span>', 'Execution <span class="serif-it">scope</span>', 'Key <span class="serif-it">highlights</span>'],
        storyParagraphs: [
          'The final output was a 5-year anniversary brand film for UKG Group. This type of content needed both internal emotional resonance and enough polish for external communication.',
          'I was responsible for shaping the "takeoff" message, building the content direction, and working with the production team to maintain brand spirit throughout the entire video.',
          'The work included defining the narrative arc for the 5-year journey, selecting the most important milestones about people, team culture, and company growth, then turning them into a script with the right emotional rhythm for a brand film.',
          'During production, a key part of the role was final quality control: visuals, voice and mood, editing rhythm, and making sure the video could be reused across events, internal communication, and corporate profile materials.',
        ],
        highlights: [
          'Turned the 5-year milestone into a brand story with a clear theme: taking off together.',
          'Balanced collective emotion with the professionalism required in a corporate brand film.',
          'Created a communication asset with long-term value for internal teams, partners, and corporate introductions.',
        ],
        actionPrimary: 'Back to Projects',
        actionSecondary: 'Contact',
        footer: ['© 2026 Duc Nguyen Portfolio', 'Brand Marketing · Campaign Strategy · Content Direction'],
      },
    },
    'vinfast-e-mobility-social-content.html': {
      vi: { navBack: 'Quay lại Dự án', actionPrimary: 'Quay lại Dự án', actionSecondary: 'Liên hệ' },
      en: {
        title: 'VinFast - E-mobility Social Content | Duc Nguyen',
        description: "Case study for VinFast social content in Duc Nguyen's portfolio.",
        menu: ['About', 'Brands', 'Featured Work', 'Projects', 'Contact'],
        navBack: 'Back to Projects',
        eyebrow: 'Project Detail',
        heroTitle: 'VinFast <span class="serif-it">E-mobility Content</span>',
        heroLead: 'A social content project for VinFast, focused on making electric mobility feel youthful, approachable, and highly shareable across digital platforms.',
        tags: ['Social Content', 'E-mobility', 'Brand Visual'],
        summaryLabels: ['Brand', 'Role', 'Category'],
        summaryValues: ['VinFast', 'Content Production', 'E-mobility'],
        storyHeadings: ['Context & <span class="serif-it">role</span>', 'Execution <span class="serif-it">scope</span>', 'Key <span class="serif-it">highlights</span>'],
        storyParagraphs: [
          'VinFast needed social content that positioned electric vehicles as an accessible mobility choice for everyday life, especially for younger audiences who value flexibility and personality.',
          'I helped produce short-form visuals and videos, selected suitable settings, shaped the image mood, and made sure the content reflected a modern and energetic brand spirit.',
          'The content system highlighted real-life vehicle usage moments: moving through the city, posing with the product, emphasizing design, color, and the approachable feeling of electric mobility.',
          'Assets were optimized for social platforms to support brand awareness, engagement, and the spirit of green movement.',
        ],
        highlights: [
          'Turned electric-vehicle products into accessible lifestyle content for younger audiences.',
          'Combined product, people, and everyday environments to make the brand feel more real.',
          'Created social assets that could be adapted across posts, reels, short videos, and campaign visuals.',
        ],
        actionPrimary: 'Back to Projects',
        actionSecondary: 'Contact',
        footer: ['© 2026 Duc Nguyen Portfolio', 'Brand Marketing · Campaign Strategy · Content Direction'],
      },
    },
  };

  if (!caseI18n[pageKey]) return;

  const applyCaseLanguage = (lang) => {
    const pageData = lang === 'en'
      ? caseI18n[pageKey].en
      : { ...viSnapshot, ...commonVi, ...(caseI18n[pageKey].vi || {}) };

    document.documentElement.lang = lang === 'en' ? 'en' : 'vi';
    document.body.dataset.lang = lang;
    localStorage.setItem(`portfolio-lang-case-${pageKey}`, lang);
    buttons.forEach((button) => button.classList.toggle('is-active', button.dataset.lang === lang));

    if (pageData.title) document.title = pageData.title;
    if (metaDescription && pageData.description) metaDescription.setAttribute('content', pageData.description);

    setTextList('nav .menu a', pageData.menu || commonVi.menu);
    setButtonLabel(navAction, pageData.navBack);

    const eyebrow = document.querySelector('.case-copy .eyebrow');
    if (eyebrow && pageData.eyebrow) eyebrow.innerHTML = `<span class="dot"></span>${pageData.eyebrow}`;

    const heroTitle = document.querySelector('.case-copy .display');
    if (heroTitle && pageData.heroTitle) heroTitle.innerHTML = pageData.heroTitle;

    const heroLead = document.querySelector('.case-lead');
    if (heroLead && pageData.heroLead) heroLead.textContent = pageData.heroLead;

    if (pageData.tags) setTextList('.case-tags span', pageData.tags);
    if (pageData.channelTags) setTextList('.case-channel-tags a', pageData.channelTags);
    if (pageData.summaryLabels) setTextList('.case-summary-card .label', pageData.summaryLabels);
    if (pageData.summaryValues) setTextList('.case-summary-card .value', pageData.summaryValues);
    if (pageData.storyHeadings) setHTMLList('.case-story h2', pageData.storyHeadings);
    if (pageData.storyParagraphs) setTextList('.case-story p', pageData.storyParagraphs);
    if (pageData.highlights) setTextList('.case-highlights li', pageData.highlights);
    if (pageData.highlightCaptions) setTextList('.case-highlight-gallery figcaption', pageData.highlightCaptions);

    const primaryAction = document.querySelector('.case-actions .btn.btn-amber');
    const secondaryAction = document.querySelector('.case-actions .btn-outline');
    if (primaryAction && pageData.actionPrimary) setButtonLabel(primaryAction, pageData.actionPrimary);
    if (secondaryAction && pageData.actionSecondary) secondaryAction.textContent = pageData.actionSecondary;

    const nextHeading = document.querySelector('.case-next-panel h2');
    const nextButton = document.querySelector('.case-next-panel .btn.btn-amber');
    if (nextHeading && pageData.nextHeading) nextHeading.innerHTML = pageData.nextHeading;
    if (nextButton && pageData.nextButton) setButtonLabel(nextButton, pageData.nextButton);

    if (pageData.footer) setTextList('footer .foot-bot small', pageData.footer);
  };

  buttons.forEach((button) => {
    button.addEventListener('click', () => applyCaseLanguage(button.dataset.lang));
  });

  applyCaseLanguage(localStorage.getItem(`portfolio-lang-case-${pageKey}`) || 'vi');
})();

// case-study photo sliders
(function () {
  if (!document.body.classList.contains('case-page')) return;

  const page = decodeURIComponent(location.pathname.split('/').pop() || '');
  const placeholder = (label) => ({ label });
  const caseSliders = {
    'bell-home-xay-kenh-online-tu-con-so-0.html': [
      { src: '../case-assets/bell-home-green-consumption.webp', alt: 'Bell Home green consumption' },
      { src: '../case-assets/bell-home-live-square.webp', alt: 'Bell Home livestream' },
      { src: '../case-assets/bell-home-partnership-square.webp', alt: 'Bell Home partnership' },
      { src: '../case-assets/bell-home-tiktok-channel.webp', alt: 'TikTok Bell Home' },
      { src: '../case-assets/bell-home-facebook-channel.webp', alt: 'Facebook Bell Home' },
    ],
    'catier-brand-do-an-cho-thu-cung.html': [
      { src: '../case-assets/catier-pet-food-hero.webp', alt: 'Catier pet food' },
      { src: '../case-assets/catier-combo-129k.webp', alt: 'Catier combo 129K' },
      { src: '../case-assets/catier-food-choice.webp', alt: 'Catier food choice' },
      { src: '../case-assets/catier-photo-01.webp', alt: 'Catier pet photo 01' },
      { src: '../case-assets/catier-photo-02.webp', alt: 'Catier pet photo 02' },
    ],
    'colgate-multi-product-content-campaign.html': [
      { src: '../case-assets/colgate-mega-livestream-hung-huynh.webp', alt: 'Colgate mega livestream' },
      { src: '../case-assets/colgate-livestream-pewpew.webp', alt: 'Colgate livestream PewPew' },
      { src: '../case-assets/colgate-livestream-norinpham.webp', alt: 'Colgate livestream NorinPham' },
      { src: '../case-assets/colgate-livestream-nguyen-thi.webp', alt: 'Colgate livestream TikTok Shop' },
      { src: '../case-assets/colgate-slider-sc2.webp', alt: 'Colgate TikTok Shop livestream campaign' },
    ],
    'dalat-hasfarm-digital-shelf-talker.html': [
      { src: '../assets/proj-bg-dalat-hasfarm-sky.webp', alt: 'Dalat Hasfarm brand visual' },
      { src: '../case-assets/dalat-hasfarm-slider-01.webp', alt: 'Dalat Hasfarm flower 01' },
      { src: '../case-assets/dalat-hasfarm-slider-02.webp', alt: 'Dalat Hasfarm flower 02' },
      { src: '../case-assets/dalat-hasfarm-slider-03.webp', alt: 'Dalat Hasfarm flower 03' },
      { src: '../case-assets/dalat-hasfarm-slider-04.webp', alt: 'Dalat Hasfarm flower 04' },
    ],
    'kalite-product-communication-may-ep-cham.html': [
      { src: '../case-assets/kalite-kl530-may-ep-cham.webp', alt: 'Kalite may ep cham' },
      { src: '../case-assets/kalite-kl530-thanh-am-mien-nui.webp', alt: 'Kalite thanh am mien nui' },
      { src: '../assets/proj-03.webp', alt: 'Kalite project visual' },
      placeholder('Anh 04'),
      placeholder('Anh 05'),
    ],
    'kalite-campaign-tet-khong-dau-thi-se-giau.html': [
      { src: '../case-assets/kalite-khong-dau-thi-se-giau.webp', alt: 'Kalite khong dau thi se giau' },
      { src: '../case-assets/kalite-kl530-thanh-am-mien-nui.webp', alt: 'Kalite thanh am mien nui' },
      { src: '../case-assets/kalite-kl530-may-ep-cham.webp', alt: 'Kalite may ep cham' },
      placeholder('Anh 04'),
      placeholder('Anh 05'),
    ],
    'ladi-group-multi-brand-ecosystem.html': [
      { src: '../case-assets/ladi-slider-atelier-011.webp', alt: 'Ladi Atelier dining corner' },
      { src: '../case-assets/ladi-slider-casa-030.webp', alt: 'Ladi Casa living corner' },
      { src: '../case-assets/ladi-slider-hang-bong-002.webp', alt: 'Ladi Hang Bong bedroom interior' },
      { src: '../case-assets/ladi-slider-nha-tho-t2-012.webp', alt: 'Ladi Nha Tho floor 2 interior' },
      { src: '../case-assets/ladi-slider-nha-tho-t3-041.webp', alt: 'Ladi Nha Tho floor 3 interior' },
      { src: '../case-assets/ladi-slider-valley-022.webp', alt: 'Ladi Valley kitchen interior' },
      { src: '../case-assets/ladi-slider-studio-011.webp', alt: 'Ladi Studio interior' },
    ],
    'lazada-video-campaign-ngay-sale-lon.html': [
      { src: '../case-assets/lazada-slider-01.webp', alt: 'Lazada sale visual 01' },
      { src: '../case-assets/lazada-slider-02.webp', alt: 'Lazada sale visual 02' },
      { src: '../case-assets/lazada-slider-03.webp', alt: 'Lazada sale visual 03' },
      { src: '../case-assets/lazada-slider-04.webp', alt: 'Lazada sale visual 04' },
      { src: '../case-assets/lazada-slider-05.webp', alt: 'Lazada sale visual 05' },
    ],
    'lotteria-series-chau-giang-ne.html': [
      { src: '../assets/proj-bg-lotteria.webp', alt: 'Lotteria Chau Giang ne' },
      { src: '../Logo/lotteria logo.webp', alt: 'Lotteria logo' },
      placeholder('Anh 03'),
      placeholder('Anh 04'),
      placeholder('Anh 05'),
    ],
    'pho-de-nhat-bi-quyet-gia-truyen.html': [
      { src: '../case-assets/pho-slider-06.webp', alt: 'Phở Đệ Nhất visual 01' },
      { src: '../case-assets/pho-slider-07.webp', alt: 'Phở Đệ Nhất visual 02' },
      { src: '../case-assets/pho-slider-08.webp', alt: 'Phở Đệ Nhất visual 03' },
      { src: '../case-assets/pho-slider-09.webp', alt: 'Phở Đệ Nhất visual 04' },
      { src: '../case-assets/pho-slider-10.webp', alt: 'Phở Đệ Nhất visual 05' },
    ],
    'ukg-brand-film-fly-together.html': [
      { src: '../assets/proj-bg-ukg.webp', alt: 'UKG Fly Together' },
      { src: '../Logo/UKG logo.webp', alt: 'UKG logo' },
      placeholder('Anh 03'),
      placeholder('Anh 04'),
      placeholder('Anh 05'),
    ],
    'lang-nuoi-bien-van-don-thuong-hieu-diem-den.html': [
      { src: '../assets/van-don-bg.webp', alt: 'Lang Nuoi Bien Van Don' },
      { src: '../case-assets/van-don-slider-01.webp', alt: 'Van Don visual 01' },
      { src: '../case-assets/van-don-slider-02.webp', alt: 'Van Don visual 02' },
      { src: '../case-assets/van-don-slider-03.webp', alt: 'Van Don visual 03' },
      { src: '../case-assets/van-don-slider-04.webp', alt: 'Van Don visual 04' },
    ],
    'vinfast-e-mobility-social-content.html': [
      { src: '../assets/proj-bg-vinfast-green-future.webp', alt: 'VinFast Green Future' },
      { src: '../case-assets/vinfast-social-01.webp', alt: 'VinFast social visual 01' },
      { src: '../case-assets/vinfast-social-02.webp', alt: 'VinFast social visual 02' },
      { src: '../case-assets/vinfast-social-03.webp', alt: 'VinFast social visual 03' },
      { src: '../case-assets/vinfast-social-04.webp', alt: 'VinFast social visual 04' },
    ],
  };

  const assets = caseSliders[page];
  const actions = document.querySelector('.case-story:last-of-type .case-actions');
  if (!actions) return;

  function buildFigure(item, index) {
    const figure = document.createElement('figure');
    if (item?.src) {
      const img = document.createElement('img');
      img.src = item.src;
      img.alt = item.alt || `Case image ${index + 1}`;
      img.loading = 'lazy';
      figure.appendChild(img);
      return figure;
    }
    figure.className = 'case-image-placeholder';
    const span = document.createElement('span');
    span.textContent = item?.label || `Anh ${String(index + 1).padStart(2, '0')}`;
    figure.appendChild(span);
    return figure;
  }

  const fallbackHero = document.querySelector('.case-media img')?.getAttribute('src');
  const items = (assets && assets.length ? assets : [
    fallbackHero ? { src: fallbackHero, alt: 'Case image' } : placeholder('Anh 01'),
    placeholder('Anh 02'),
    placeholder('Anh 03'),
    placeholder('Anh 04'),
    placeholder('Anh 05'),
  ]);

  const targetCount = items.length || 5;

  let slider = document.querySelector('.case-photo-slider');
  if (!slider) {
    slider = document.createElement('div');
    slider.className = 'case-photo-slider';
    slider.setAttribute('aria-label', 'Hinh anh du an');
    actions.parentNode.insertBefore(slider, actions);
  }

  slider.innerHTML = '';
  items.slice(0, targetCount).forEach((item, index) => {
    slider.appendChild(buildFigure(item, index));
  });
})();

// testimonial slider — hiện 2/3, prev/next
(function () {
  const grid = document.getElementById('testiGrid');
  if (!grid) return;
  const cards = Array.from(grid.querySelectorAll('.tquote'));
  const total = cards.length; // 3
  let idx = 0; // index của card đầu tiên đang hiện
  const prevBtn = document.getElementById('testiBtnPrev');
  const nextBtn = document.getElementById('testiBtnNext');
  const nav = document.querySelector('.testi-nav');

  if (total <= 2) {
    nav?.setAttribute('hidden', 'hidden');
  }

  function render() {
    cards.forEach((c, i) => {
      const visible = i === idx % total || i === (idx + 1) % total;
      c.style.display = visible ? '' : 'none';
    });
  }

  prevBtn?.addEventListener('click', () => {
    idx = (idx - 1 + total) % total;
    render();
  });
  nextBtn?.addEventListener('click', () => {
    idx = (idx + 1) % total;
    render();
  });

  render();
})();

// graceful image fallback — nếu ảnh logo / case chưa có thì ẩn ảnh, hiện chữ thay thế
document.querySelectorAll('.logo-item img, .case-image').forEach((img) => {
  const markBroken = () => img.classList.add('broken');
  img.addEventListener('error', markBroken);
  if (img.complete && img.naturalWidth === 0) markBroken();
});



