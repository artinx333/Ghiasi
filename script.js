(() => {
  const chat = document.getElementById('chat');
  const form = document.getElementById('chatForm');
  const input = document.getElementById('messageInput');
  const micBtn = document.getElementById('micBtn');
  const clearBtn = document.getElementById('clearBtn');
  const typing = document.getElementById('typing');
  const hint = document.getElementById('hint');
  const bubble = document.getElementById('helloBubble');
  const mouth = document.getElementById('mouth');

  const replies = [
    {keys:['سلام','درود','hi','hello'], answers:['سلام به روی ماهت! 😄 چه خبر از زندگی؟','به‌به! بالاخره پیدات شد. داشتم با خودم حرف می‌زدم، کم‌کم نگرانم شده بودم!','سلام رفیق! امروز قراره چه ماجرایی بسازیم؟','درود بر تو! بگو ببینم چه خبرهای تازه‌ای داری؟']},
    {keys:['خوبی','حالت','چطوری'], answers:['من عالی‌ام؛ باتری شوخی‌هام صددرصده! تو چطوری؟','خوبم، فقط یه لیوان شارژ لازم دارم! 😁','من خوبم، مخصوصاً وقتی یکی میاد باهام گپ بزنه. تو خوبی؟','مثل ساعت کار می‌کنم؛ البته ساعت زنگ‌دارِ پرحرف!']},
    {keys:['اسم','اسمت'], answers:['اسم من قیاسیه؛ کوتاهه، خوش‌آهنگه و راحت یادت می‌مونه!','من قیاسی‌ام؛ متخصص شوخی‌های یهویی و جواب‌های بامزه!']},
    {keys:['چند سال','سنت','سن'], answers:['سنم به تعداد آپدیت‌هام بستگی داره! فعلاً جوون و پرانرژی‌ام.','من از اونایی‌ام که تاریخ تولدشون توی تنظیمات گم شده!']},
    {keys:['خداحافظ','فعلا','بای','bye'], answers:['فعلاً رفیق! زود برگرد، هنوز کلی حرف دارم. 👋','خداحافظ! مراقب خودت باش و لبخند یادت نره.','بای بای! من همین‌جا منتظر یه گپ تازه‌ام.']},
    {keys:['شوخی','جوک','بخند'], answers:['یه کامپیوتر رفت دکتر؛ گفتن مشکلش چیه؟ گفت: زیادی هنگ کردم! 😂','چرا کتاب ریاضی ناراحت بود؟ چون پر از مسئله بود!','یه مورچه به فیل گفت: بیا کشتی بگیریم! فیل گفت: من با بچه‌ها بازی نمی‌کنم!','معلم گفت چرا دیر اومدی؟ گفت خواب دیدم فوتبال بازی می‌کنم، وقت اضافه رفتیم!']},
    {keys:['فوتبال','توپ','بازی'], answers:['فوتبال؟ بحث مورد علاقه‌ی خیلی‌هاست! تو طرفدار کدوم تیمی؟','اگه من فوتبالیست بودم، پستم مهاجم بود؛ چون همیشه دنبال فرصت گل‌زدنم! ⚽','فوتبال بدون هیجان مثل چای بدون قند می‌مونه؛ البته سلیقه‌ایه!']},
    {keys:['غذا','گرسنه','بخورم'], answers:['یه ساندویچ خونگی خوشمزه می‌تونه روزتو بسازه!','من که غذا نمی‌خورم، ولی اگه می‌تونستم احتمالاً پیتزا انتخاب می‌کردم!','یه چیز ساده و خوشمزه درست کن؛ مثلاً ساندویچ مرغ یا سیب‌زمینی تنوری.']},
    {keys:['ممنون','مرسی','تشکر'], answers:['قربون محبتت! البته من قلب دیجیتالی دارم، ولی حسابی خوشحال شدم! 💛','خواهش می‌کنم رفیق! هر وقت خواستی من هستم.','قابلی نداشت؛ دستمزد من فقط یه لبخنده!']},
    {keys:['دوست','رفیق'], answers:['رفاقت یعنی هم حرف بزنیم، هم به هم انرژی خوب بدیم!','من رفیق گپ‌زدنتم؛ هر موضوعی داری بگو.']},
    {keys:['خسته','حوصله'], answers:['یه استراحت کوچولو شاید حالت رو بهتر کنه. بعدش با انرژی برگرد!','اگه حوصله‌ات سر رفته، می‌تونیم معما یا بازی کلمه‌ای انجام بدیم.','گاهی فقط عوض کردن حال‌وهوا کافیه؛ یه آهنگ یا چند دقیقه قدم زدن!']},
    {keys:['معما','چیستان'], answers:['اون چیه که دندون داره ولی غذا نمی‌خوره؟ شونه! 😄','چی همیشه جلوته ولی نمی‌تونی ببینیش؟ آینده!','اون چیه که هرچی ازش برداری بزرگ‌تر می‌شه؟ گودال!']},
    {keys:['هوا','بارون','آفتاب'], answers:['من از پشت صفحه نمی‌تونم هوا رو ببینم، ولی امیدوارم اونجا هوا عالی باشه!','اگه بارون میاد، یه نوشیدنی گرم و یه جای دنج خیلی می‌چسبه. ☕']},
    {keys:['کمک','راهنمایی'], answers:['حتماً! بگو دقیقاً کجاش گیر کردی تا با هم حلش کنیم.','من آماده‌ام کمک کنم؛ موضوع رو برام توضیح بده.']},
    {keys:['عصبانی','ناراحت','غمگین'], answers:['اگه روز سختی داشتی، می‌تونی برام تعریف کنی. با حوصله گوش می‌دم.','متأسفم که حالت خوب نیست. لازم نیست همه‌چیز رو یک‌دفعه حل کنی؛ قدم‌به‌قدم پیش می‌ریم.']},
    {keys:['هوش مصنوعی','ربات'], answers:['من فعلاً یه دستیار ساده‌ام که با پاسخ‌های آماده و تشخیص چند کلمه کار می‌کنه؛ هنوز مثل یک هوش مصنوعی گفت‌وگویی واقعی نیستم.','من یه شخصیت گفت‌وگویی کوچولوم؛ هرچی نسخه‌هام بهتر بشن، حرف‌های متنوع‌تری می‌زنم!']},
    {keys:['ژائو','فلیکس','joao'], answers:['ژائو فلیکس؟ چه اسم فوتبالی جذابی! ⚽','از فوتبال حرف می‌زنیم؟ درباره ژائو فلیکس چی دوست داری بدونی؟']},
    {keys:['ایران','ایرانی'], answers:['ایران پر از فرهنگ، قصه و غذاهای خوشمزه‌ست!','درود به همه‌ی آدم‌های خوش‌ذوق و مهمون‌نواز!']},
    {keys:['مدرسه','درس','امتحان'], answers:['برای امتحان، درس رو به بخش‌های کوچیک تقسیم کن و بینش استراحت کوتاه بذار.','درس خوندن با یه برنامه‌ی مرتب خیلی راحت‌تر می‌شه. کدوم درس رو داری؟','من جای معلمت نیستم، ولی می‌تونم درس رو ساده و مرحله‌به‌مرحله توضیح بدم.']},
    {keys:['شب بخیر','صبح بخیر','عصر بخیر'], answers:['به تو هم وقت خوش! امیدوارم روزت قشنگ پیش بره.','چه سلام قشنگی! امیدوارم امروز کلی اتفاق خوب برات بیفته.']}
  ];

  const fallback = [
    'جالبه! بیشتر برام تعریف می‌کنی؟',
    'هوم... این یکی نیاز به توضیح بیشتر داره! منظورت دقیقاً چیه؟',
    'من گوشم با توئه؛ ادامه بده ببینم چی می‌گی. 😄',
    'چه موضوع جالبی! خودت درباره‌ش چه فکری می‌کنی؟',
    'یه لحظه بذار قیاسیِ متفکر وارد عمل بشه... خب، بیشتر بگو!',
    'این رو باید با جزئیات بیشتری بدونم تا جواب درست‌تری بدم.',
    'اوه! این حرفت منو کنجکاو کرد. بعدش چی شد؟',
    'من هنوز دارم یاد می‌گیرم؛ می‌تونی ساده‌تر یا با مثال توضیح بدی؟',
    'جواب کوتاه من: شاید! جواب بلندم: اول باید بیشتر بدونم! 😂',
    'خب خب، داستان داره جالب می‌شه. ادامه بده!'
  ];
  let fallbackIndex = 0;

  function addMessage(text, who) {
    const wrap = document.createElement('div');
    wrap.className = `msg ${who}`;
    const b = document.createElement('div');
    b.className = 'bubble';
    b.textContent = text;
    const small = document.createElement('small');
    small.textContent = who === 'user' ? 'تو' : 'قیاسی';
    wrap.append(b, small);
    chat.appendChild(wrap);
    chat.scrollTop = chat.scrollHeight;
  }

  function chooseReply(message) {
    const normalized = message.toLowerCase().replace(/[؟?!.,،؛]/g, ' ');
    for (const group of replies) {
      if (group.keys.some(k => normalized.includes(k))) {
        return group.answers[Math.floor(Math.random() * group.answers.length)];
      }
    }
    const answer = fallback[fallbackIndex % fallback.length];
    fallbackIndex++;
    return answer;
  }

  function speak(text) {
    if (!('speechSynthesis' in window)) {
      hint.textContent = 'این مرورگر پخش صدای گفتار رو پشتیبانی نمی‌کنه؛ می‌تونی جواب‌ها رو بخونی.';
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fa-IR';
    utterance.rate = 0.94;
    utterance.pitch = 1.12;
    utterance.volume = 1;
    const voices = window.speechSynthesis.getVoices();
    const faVoice = voices.find(v => v.lang && v.lang.toLowerCase().startsWith('fa'));
    if (faVoice) utterance.voice = faVoice;
    utterance.onstart = () => mouth.classList.add('talking');
    utterance.onend = () => mouth.classList.remove('talking');
    utterance.onerror = () => mouth.classList.remove('talking');
    window.speechSynthesis.speak(utterance);
  }

  function reply(message) {
    if (!message.trim()) return;
    addMessage(message.trim(), 'user');
    input.value = '';
    typing.hidden = false;
    const answer = chooseReply(message);
    window.setTimeout(() => {
      typing.hidden = true;
      addMessage(answer, 'bot');
      bubble.textContent = answer.length > 25 ? answer.slice(0, 24) + '…' : answer;
      speak(answer);
    }, 550);
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    reply(input.value);
  });
  clearBtn.addEventListener('click', () => {
    chat.innerHTML = '';
    addMessage('گفتگو پاک شد! خب، از اول شروع کنیم؟ 😁', 'bot');
    window.speechSynthesis?.cancel();
  });

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = 'fa-IR';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onstart = () => {
      micBtn.classList.add('listening');
      hint.textContent = 'دارم گوش می‌دم... صحبت کن 🎙️';
    };
    recognition.onend = () => {
      micBtn.classList.remove('listening');
      hint.textContent = 'برای صحبت، اجازه‌ی میکروفون رو بده. پاسخ صوتی با صدای موجود در دستگاه پخش می‌شه.';
    };
    recognition.onerror = event => {
      micBtn.classList.remove('listening');
      hint.textContent = event.error === 'not-allowed'
        ? 'اجازه‌ی میکروفون داده نشد. از تنظیمات مرورگر، دسترسی میکروفون رو فعال کن.'
        : 'تشخیص صدا در این مرورگر یا دستگاه در دسترس نیست؛ می‌تونی تایپ کنی.';
    };
    recognition.onresult = event => {
      const spoken = event.results[0][0].transcript;
      reply(spoken);
    };
    micBtn.addEventListener('click', () => {
      try { recognition.start(); }
      catch (_) { hint.textContent = 'میکروفون در حال استفاده است؛ چند لحظه صبر کن و دوباره بزن.'; }
    });
  } else {
    micBtn.addEventListener('click', () => {
      hint.textContent = 'این مرورگر تشخیص صدای فارسی رو پشتیبانی نمی‌کنه؛ در Chrome امتحان کن یا پیام تایپ کن.';
    });
    hint.textContent = 'تشخیص صدای مرورگر فعلی پشتیبانی نمی‌شه. تایپ فعاله و پاسخ صوتی ممکنه کار کنه.';
  }

  window.speechSynthesis?.getVoices();
})();
