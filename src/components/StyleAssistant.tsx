import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

type ChatMessage = { id: number; from: 'bot' | 'user'; text: string };

const assistantCopy = {
  ar: {
    title: 'مساعد ستايل ذكي',
    subtitle: 'اختار سؤال من القائمة لتحصل على رد سريع.',
    welcome: 'أهلًا! اختار سؤال من القائمة وسأرد فورًا.',
    placeholder: 'اختار سؤال من القائمة...',
    send: 'إرسال',
    note: 'الردود هنا من قائمة الأسئلة. اختار سؤال من فوق وهتلاقي الإجابة نازلة تحت.'
  },
  en: {
    title: 'AI Style Assistant',
    subtitle: 'Pick a question from the list to get a quick answer.',
    welcome: 'Hi! Pick a question from the list and I will answer instantly.',
    placeholder: 'Pick a question from the list...',
    send: 'Send',
    note: 'Pick a question from the list to get a quick answer.'
  }
};

const faqItems = [
  {
    id: 'pricing',
    question: {
      ar: 'ما هي أسعار البداية؟',
      en: 'What are your starting prices?'
    },
    answer: {
      ar: 'السعر بيتحدد حسب نوع القطعة (تيشيرت/هودي/جاكيت)، المقاس، عدد الألوان، وطريقة التنفيذ (طباعة أو تطريز). ابعت لنا خامة القطعة والكمية ومدينة التوصيل علشان نطلع لك عرض سعر دقيق.',
      en: 'Pricing depends on item type (tee/hoodie/jacket), size, color count, technique (print or embroidery), and quantity. Share your fabric choice, quantity, and delivery city for a precise quote.'
    }
  },
  {
    id: 'minimum',
    question: {
      ar: 'هل فيه حد أدنى للطلب؟',
      en: 'Is there a minimum order?'
    },
    answer: {
      ar: 'مفيش حد أدنى ثابت، ممكن نعمل قطعة واحدة. لكن الكميات الأكبر بتقلل سعر القطعة وبتسهّل جدولة الشغل.',
      en: 'No fixed minimum. We can do one piece, and larger quantities get better unit pricing and smoother scheduling.'
    }
  },
  {
    id: 'bulkDiscount',
    question: {
      ar: 'هل فيه خصم للكميات؟',
      en: 'Do you offer bulk discounts?'
    },
    answer: {
      ar: 'أيوه، السعر للقطعة بينزل كل ما الكمية تزيد. ابعت تقسيم المقاسات والعدد المطلوب علشان نحسب لك أفضل سعر.',
      en: 'Yes, unit price drops as quantity increases. Send the size breakdown so we can calculate the best price.'
    }
  },
  {
    id: 'turnaround',
    question: {
      ar: 'الطباعة/التطريز بياخد وقت قد إيه؟',
      en: 'How long does production and delivery take?'
    },
    answer: {
      ar: 'المدة بتعتمد على الكمية وتعقيد التصميم. غالبًا التنفيذ بياخد من 2 إلى 5 أيام عمل بعد التأكيد، وبنثبت معاك المعاد قبل ما نبدأ.',
      en: 'Timing depends on quantity and artwork. Typical production is 2-5 business days after confirmation, and we confirm the schedule before starting.'
    }
  },
  {
    id: 'rush',
    question: {
      ar: 'هل فيه تنفيذ مستعجل؟',
      en: 'Do you offer rush orders?'
    },
    answer: {
      ar: 'حسب ضغط الشغل الحالي. ابعت المعاد اللي محتاجه ونشوف إمكانية التنفيذ والتكلفة الإضافية.',
      en: 'It depends on current workload. Share your deadline and we will confirm feasibility and cost.'
    }
  },
  {
    id: 'services',
    question: {
      ar: 'إيه أنواع الطباعة والتطريز المتاحة؟',
      en: 'What print and embroidery options do you offer?'
    },
    answer: {
      ar: 'متاح طباعة DTF، وطباعة سكرين، وتطريز عالي الجودة. بنرشح لك الأنسب حسب نوع الخامة والتصميم.',
      en: 'We offer DTF, screen printing, and high-quality embroidery. We recommend the best option for your fabric and artwork.'
    }
  },
  {
    id: 'combo',
    question: {
      ar: 'ممكن تجمعوا بين الطباعة والتطريز؟',
      en: 'Can you combine print and embroidery?'
    },
    answer: {
      ar: 'أيوه، ممكن ندمجهم على نفس القطعة. بنظبط أماكن التنفيذ بحيث الشكل النهائي يبقى متوازن وبنأكد السعر قبل الإنتاج.',
      en: 'Yes, we can combine print and embroidery on the same piece. We align placements for a balanced look and confirm pricing before production.'
    }
  },
  {
    id: 'fabrics',
    question: {
      ar: 'الخامات المتاحة إيه؟',
      en: 'Which fabrics are available?'
    },
    answer: {
      ar: 'متاح قطن 100%، وخليط قطن، وفليس للهوديز، وخيارات تانية حسب المتوفر. قل لنا الاستخدام والميزانية علشان نرشح لك خامة مناسبة.',
      en: 'Available fabrics include 100% cotton, cotton blends, fleece for hoodies, and more depending on stock. Tell us your use case and budget.'
    }
  },
  {
    id: 'sizes',
    question: {
      ar: 'المقاسات المتاحة إيه؟',
      en: 'What sizes do you offer?'
    },
    answer: {
      ar: 'المقاسات القياسية عادة من S لحد XXL، وممكن مقاسات خاصة في الطلبات الكبيرة. بنبعت جدول مقاسات للمراجعة قبل التنفيذ.',
      en: 'Standard sizes are usually S to XXL, and custom sizing is possible for bulk orders. We share a size chart before production.'
    }
  },
  {
    id: 'colors',
    question: {
      ar: 'الألوان المتاحة إيه؟',
      en: 'What colors are available?'
    },
    answer: {
      ar: 'الألوان بتعتمد على المخزون الحالي. لو محتاج درجة لون محددة، بنأكد توافرها أو نقترح أقرب بديل.',
      en: 'Many colors are available based on stock. If a specific shade matters, we confirm availability or suggest a close alternative.'
    }
  },
  {
    id: 'colorMatch',
    question: {
      ar: 'هل ممكن تطابقوا ألوان اللوجو؟',
      en: 'Can you match my logo colors?'
    },
    answer: {
      ar: 'بنحاول نطابق الألوان قدر الإمكان باستخدام ملفات عالية الجودة. لو الدقة مهمة جدًا، ابعت كود اللون أو عينة مرجعية.',
      en: 'We match colors as closely as possible with high-quality files. If accuracy is critical, share a color code or sample.'
    }
  },
  {
    id: 'files',
    question: {
      ar: 'إيه صيغ الملفات المقبولة؟',
      en: 'Which file formats do you accept?'
    },
    answer: {
      ar: 'PNG أو JPG أو PDF حتى 10MB. يفضل دقة 300dpi وخلفية شفافة، وملفات الـVector ممتازة للتطريز.',
      en: 'PNG, JPG, and PDF up to 10MB. 300dpi and transparent backgrounds are preferred. Vector files are best for embroidery.'
    }
  },
  {
    id: 'placement',
    question: {
      ar: 'أماكن الطباعة/التطريز المتاحة؟',
      en: 'Where can you place the print or embroidery?'
    },
    answer: {
      ar: 'المواضع الشائعة: صدر، ظهر، كم، أو أماكن خاصة حسب الطلب. بنأكد المقاسات بالسنتيمتر قبل التنفيذ.',
      en: 'Placement can be chest, back, sleeve, or custom. We confirm size and placement in centimeters before production.'
    }
  },
  {
    id: 'mockup',
    question: {
      ar: 'هل بتبعتوا معاينة قبل التنفيذ؟',
      en: 'Do you share a preview before production?'
    },
    answer: {
      ar: 'أيوه، بنبعت موكاب علشان تتأكد من المكان والمقاس والألوان. ده بيقلل أي فروق غير متوقعة.',
      en: 'Yes, we can send a mockup to confirm placement, size, and colors. This helps ensure the result matches your expectations.'
    }
  },
  {
    id: 'sample',
    question: {
      ar: 'ممكن أعمل عينة قبل الكميات؟',
      en: 'Can I make a sample before a bulk order?'
    },
    answer: {
      ar: 'ممكن جدًا عينة لاختبار الخامة والألوان والنتيجة. تكلفة العينة بتتحدد حسب تعقيد التصميم وسرعة التنفيذ.',
      en: 'Yes, we can make a sample to confirm fabric, colors, and finish. Sample cost depends on design complexity and timeline.'
    }
  },
  {
    id: 'designSupport',
    question: {
      ar: 'ممكن تساعدوني في التصميم من البداية؟',
      en: 'Can you help design from scratch?'
    },
    answer: {
      ar: 'لو مفيش تصميم جاهز، نقدر نساعدك في فكرة بسيطة وترتيب العناصر. ابعت مرجع أو وصف واضح والألوان المفضلة.',
      en: 'If you do not have artwork, we can help build a simple concept or arrange elements. Share your references and preferred colors.'
    }
  },
  {
    id: 'revision',
    question: {
      ar: 'هل فيه تعديلات على التصميم؟',
      en: 'Can you help with design adjustments?'
    },
    answer: {
      ar: 'بنساعد في تعديل المقاس والتموضع والألوان قبل الطباعة. بنبعت نسخة نهائية للموافقة قبل التنفيذ.',
      en: 'We can refine layout, sizing, and colors before production and share a final preview for approval.'
    }
  },
  {
    id: 'payment',
    question: {
      ar: 'طرق الدفع المتاحة إيه؟',
      en: 'What payment options are available?'
    },
    answer: {
      ar: 'بنأكد التفاصيل الأول ثم نبدأ بعد موافقتك أو بعد عربون حسب الاتفاق. قول لنا الطريقة المناسبة ليك.',
      en: 'We confirm details first, then start after confirmation or a deposit as agreed. Tell us your preferred payment method.'
    }
  },
  {
    id: 'delivery',
    question: {
      ar: 'التوصيل بيكون فين؟',
      en: 'Where do you deliver?'
    },
    answer: {
      ar: 'بنوصّل داخل مصر. التكلفة والمدة بتختلف حسب المدينة، وبنبلّغك بكل التحديثات.',
      en: 'We deliver across Egypt. Cost and timing depend on location, and we send shipping updates.'
    }
  },
  {
    id: 'tracking',
    question: {
      ar: 'هل فيه تتبع للشحن؟',
      en: 'Do you provide shipment tracking?'
    },
    answer: {
      ar: 'أيوه، بنبعت رقم التتبع وتحديثات الشحن لحد الاستلام. لو حصل أي تغيير بنبلغك فورًا.',
      en: 'We share the tracking number and shipment updates until delivery. If anything changes, we notify you quickly.'
    }
  },
  {
    id: 'international',
    question: {
      ar: 'هل فيه شحن خارج مصر؟',
      en: 'Do you ship outside Egypt?'
    },
    answer: {
      ar: 'حاليًا الشحن داخل مصر فقط. لو محتاج شحن دولي ممكن ننسّق مع شركة شحن حسب التوفر والتكلفة.',
      en: 'Currently we deliver within Egypt only. If you need international shipping, we can coordinate with a courier based on availability and cost.'
    }
  },
  {
    id: 'pickup',
    question: {
      ar: 'هل فيه استلام من المكان؟',
      en: 'Can I pick up the order?'
    },
    answer: {
      ar: 'لو حابب تستلم بنفسك، ممكن ننسق ميعاد الاستلام بعد جاهزية الطلب. ده بيوفر وقت التوصيل وتكلفته.',
      en: 'If you want to pick up, we can schedule a pickup time after your order is ready. This saves delivery time and cost.'
    }
  },
  {
    id: 'returns',
    question: {
      ar: 'هل فيه استبدال أو استرجاع؟',
      en: 'Do you accept exchanges or returns?'
    },
    answer: {
      ar: 'لأن الشغل مخصص حسب الطلب، الاسترجاع بيكون للحالات اللي فيها عيب تصنيع فقط. لو في مشكلة بنراجعها بسرعة ونحلها.',
      en: 'Because each order is custom, returns are only for confirmed production defects. If there is an issue, we review it quickly and fix it.'
    }
  },
  {
    id: 'care',
    question: {
      ar: 'إزاي أحافظ على الطباعة/التطريز؟',
      en: 'How should I care for the print?'
    },
    answer: {
      ar: 'اغسل بالمقلوب وعلى درجة حرارة منخفضة. تجنب المبيض والكي المباشر على مكان الطباعة.',
      en: 'Wash cold and inside out. Avoid bleach and direct ironing on the print.'
    }
  },
  {
    id: 'branding',
    question: {
      ar: 'هل ممكن تضيفوا لوجو داخلي أو تغليف خاص؟',
      en: 'Can you add custom labels or packaging?'
    },
    answer: {
      ar: 'ممكن نضيف لوجو داخلي أو تيكتات مخصصة أو تغليف براند. ابعت تفاصيل الهوية علشان نطلع لك خيارات مناسبة.',
      en: 'Yes, we can add custom labels, inner neck prints, or packaging. Share your brand details for tailored options.'
    }
  },
  {
    id: 'durability',
    question: {
      ar: 'العمر الافتراضي للطباعة قد إيه؟',
      en: 'How long does the print last?'
    },
    answer: {
      ar: 'مع العناية الصحيحة الطباعة بتفضل ثابتة لفترة طويلة، والتطريز بطبيعته الأكثر تحمّلًا. بنرشح التقنية الأنسب للاستخدام اليومي أو التجاري.',
      en: 'With proper care the print lasts a long time, and embroidery is naturally the most durable. We recommend the right technique for daily or commercial use.'
    }
  },
  {
    id: 'kids',
    question: {
      ar: 'هل فيه مقاسات أطفال؟',
      en: 'Do you offer kids sizes?'
    },
    answer: {
      ar: 'متاح مقاسات أطفال حسب الخامة والمخزون. ابعت العمر أو المقاس المطلوب ونأكد التوفر.',
      en: 'Kids sizes are available depending on fabric and stock. Share the age or size you need and we will confirm availability.'
    }
  }
];

export const StyleAssistant = () => {
  const { language } = useLanguage();
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [activeFaqId, setActiveFaqId] = useState<string | null>(null);
  const [lastAddedId, setLastAddedId] = useState<number | null>(null);
  const chatShellRef = useRef<HTMLDivElement>(null);
  const chatMessagesRef = useRef<HTMLDivElement>(null);
  const messageIdRef = useRef(0);

  const isAr = language === 'ar' || language === 'eg';
  const t = isAr ? assistantCopy.ar : assistantCopy.en;
  const nextMessageId = () => {
    messageIdRef.current += 1;
    return messageIdRef.current;
  };

  useEffect(() => {
    const welcomeId = nextMessageId();
    setChatMessages([{ id: welcomeId, from: 'bot', text: t.welcome }]);
    setLastAddedId(welcomeId);
    setChatInput('');
    setActiveFaqId(null);
  }, [t.welcome]);

  useEffect(() => {
    const node = chatMessagesRef.current;
    if (node) {
      node.scrollTo({ top: node.scrollHeight, behavior: 'smooth' });
    }
  }, [chatMessages]);

  useEffect(() => {
    if (lastAddedId === null) return;
    const timeout = setTimeout(() => setLastAddedId(null), 1400);
    return () => clearTimeout(timeout);
  }, [lastAddedId]);

  const handleFaqSelect = (item: typeof faqItems[number]) => {
    if (chatShellRef.current) {
      chatShellRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    const question = isAr ? item.question.ar : item.question.en;
    const answer = isAr ? item.answer.ar : item.answer.en;
    setActiveFaqId(item.id);
    const questionId = nextMessageId();
    const answerId = nextMessageId();
    setChatMessages((prev) => [
      ...prev,
      { id: questionId, from: 'user', text: question },
      { id: answerId, from: 'bot', text: answer }
    ]);
    setLastAddedId(answerId);
  };

  const handleChatSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = chatInput.trim();
    if (!trimmed) return;
    const questionId = nextMessageId();
    const noteId = nextMessageId();
    setChatMessages((prev) => [
      ...prev,
      { id: questionId, from: 'user', text: trimmed },
      { id: noteId, from: 'bot', text: t.note }
    ]);
    setLastAddedId(noteId);
    setChatInput('');
  };

  return (
    <motion.div
      className="chatbot-shell"
      ref={chatShellRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="chatbot-header">
        <div>
          <div className="chatbot-title">{t.title}</div>
          <div className="chatbot-subtitle">{t.subtitle}</div>
        </div>
        <div className="chatbot-icon">
          <Sparkles size={20} />
        </div>
      </div>
      <div className="chat-faq">
        {faqItems.map((item, index) => (
          <motion.button
            key={item.id}
            type="button"
            className={`chat-faq-btn ${activeFaqId === item.id ? 'active' : ''}`}
            aria-pressed={activeFaqId === item.id}
            onClick={() => handleFaqSelect(item)}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.02 }}
            viewport={{ once: true }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            {isAr ? item.question.ar : item.question.en}
          </motion.button>
        ))}
      </div>
      <div className="chat-messages" ref={chatMessagesRef}>
        <AnimatePresence initial={false}>
          {chatMessages.map((message) => (
            <motion.div
              key={message.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className={`chat-bubble ${message.from === 'user' ? 'user' : 'bot'} ${message.id === lastAddedId ? 'new' : ''}`}
            >
              {message.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <form className="chat-input-row" onSubmit={handleChatSubmit}>
        <input
          className="chat-input"
          value={chatInput}
          onChange={(event) => setChatInput(event.target.value)}
          placeholder={t.placeholder}
        />
        <button className="btn-primary" type="submit">
          {t.send}
        </button>
      </form>
    </motion.div>
  );
};
