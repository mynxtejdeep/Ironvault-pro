import React, { useState } from 'react';
import { 
  HelpCircle, 
  Sparkles, 
  Mail, 
  User, 
  MessageSquare, 
  ChevronDown, 
  ChevronUp, 
  X, 
  Send, 
  CheckCircle2, 
  ShoppingBag,
  ExternalLink
} from 'lucide-react';

interface HelpStoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpStoreModal: React.FC<HelpStoreModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'faqs' | 'contact' | 'gear' | 'about'>('faqs');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubject, setContactSubject] = useState('Split Customization');
  const [sentNotice, setSentNotice] = useState(false);

  if (!isOpen) return null;

  const faqs = [
    {
      q: 'How does the IronVault AI Camera Trainer count reps?',
      a: 'The camera trainer uses on-device Pose Landmarker detection to measure key skeletal joint angles (hip-knee-ankle for squats, shoulder-elbow-wrist for push-ups and curls). A mathematical hysteresis state-machine registers a repetition only after you attain full depth and return through full joint extension, rejecting partial twitch movements.'
    },
    {
      q: 'Is my video footage recorded, uploaded, or transmitted?',
      a: 'Never. IronVault Pro is built privacy-first. Processing is 100% on-device inside your browser using Google MediaPipe WebAssembly and WebGL acceleration. Zero raw camera frames, video, audio, or joint coordinates are ever uploaded, recorded, or transmitted to any cloud servers or AI APIs. The camera hardware stream terminates immediately when you finish, leave the screen, background the window, or log out.'
    },
    {
      q: 'How are my daily calories and macros calculated?',
      a: 'We calculate your Basal Metabolic Rate using the verified Mifflin-St Jeor equation, modified with your active physical quotient. We then allocate protein at 1.8 to 2.2 g/kg of bodyweight, assign 25% of calories to essential lipids, and allocate the remainder to clean carbohydrates for muscular glycogen replenishment.'
    },
    {
      q: 'Can I follow the bodybuilder splits on a vegetarian or eggetarian diet?',
      a: 'Absolutely. Our nutrition matrix includes high biological value Indian protein sources like cow milk paneer, boiled soya chunks, moong dal tadka, whole eggs, and Wellcore whey protein isolate to easily reach your 165g+ daily targets.'
    }
  ];

  const gearItems = [
    { name: 'Wellcore 100% Pure Micronized Creatine (250g)', type: 'ATP Regeneration', price: '₹999', partner: true },
    { name: 'Wellcore Pure Whey Protein Isolate (Chocolate Silk)', type: 'Rapid Myofibrillar Repair', price: '₹2,699', partner: true },
    { name: 'IronVault Heavy Duty 7mm Neoprene Knee Sleeves', type: 'Joint Compression', price: '₹1,499', partner: false },
    { name: 'IronVault Olympic 10mm Leather Lever Belt', type: 'Intra-Abdominal Bracing', price: '₹2,899', partner: false },
    { name: 'IronVault Steel Shaker Bottle (750ml)', type: 'BPA-Free Hydration', price: '₹649', partner: false }
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setSentNotice(true);
    setTimeout(() => {
      setSentNotice(false);
      setContactMessage('');
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-red-950/40 my-6">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-zinc-500 hover:text-white hover:bg-zinc-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* HEADER matching Screenshot 1 */}
        <div className="mb-6 pb-4 border-b border-zinc-800/80">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-red-500 font-bold mb-1">
            <HelpCircle className="w-4 h-4 text-red-500" />
            ATHLETE INQUIRIES, FAQS, GEAR STORE & COACHING DESK
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-black text-white uppercase">
            HELP & <span className="text-red-500">CONTACT CENTER</span>
          </h2>
          <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
            Reach our gym coaching desk with your training plateaus, nutrition questions, or split customization. Utilize our new AI Merchant for gear & supplement recommendations, or review foundational bodybuilding FAQs.
          </p>
        </div>

        {/* 4 MENU BUTTONS matching Screenshot 1 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
          <button
            onClick={() => setActiveTab('gear')}
            className={`p-2.5 rounded-xl text-xs font-bold font-heading tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'gear'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-zinc-900 border border-zinc-800 text-amber-400 hover:border-amber-600/40'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI GEAR STORE</span>
            <span className="text-[9px] bg-black/50 text-white px-1 rounded uppercase font-mono">NEW</span>
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`p-2.5 rounded-xl text-xs font-bold font-heading tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'contact'
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>COACHING DESK</span>
          </button>

          <button
            onClick={() => setActiveTab('about')}
            className={`p-2.5 rounded-xl text-xs font-bold font-heading tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'about'
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>VINAY VAISHNAV G</span>
          </button>

          <button
            onClick={() => setActiveTab('faqs')}
            className={`p-2.5 rounded-xl text-xs font-bold font-heading tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'faqs'
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>BODYBUILDING FAQS</span>
          </button>
        </div>

        {/* TAB 1: FAQS */}
        {activeTab === 'faqs' && (
          <div className="space-y-3 animate-in fade-in duration-150">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 cursor-pointer"
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-bold text-white font-heading tracking-wider">
                    {faq.q}
                  </span>
                  {expandedFaq === idx ? <ChevronUp className="w-4 h-4 text-red-500" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
                </div>
                {expandedFaq === idx && (
                  <p className="text-xs text-zinc-400 mt-3 pt-2 border-t border-zinc-800/60 leading-relaxed animate-in fade-in">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: COACHING DESK */}
        {activeTab === 'contact' && (
          <form onSubmit={handleSendMessage} className="space-y-4 animate-in fade-in duration-150">
            <div>
              <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">Inquiry Category</label>
              <select
                value={contactSubject}
                onChange={(e) => setContactSubject(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-red-500 font-mono"
              >
                <option value="Split Customization">Split & Periodization Customization</option>
                <option value="Nutrition Plateau">Caloric Plateau & Macro Adjustments</option>
                <option value="AI Camera Troubleshooting">AI Camera Pose Calibration</option>
                <option value="Gear Recommendation">Supplement & Gear Recommendation</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">Your Question / Training Plateau</label>
              <textarea
                required
                rows={4}
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                placeholder="Describe your current lifting plateau, injury limitation, or macro question..."
                className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-red-500"
              />
            </div>

            {sentNotice && (
              <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-600/80 text-xs font-mono text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Inquiry logged with the IronVault Coaching Desk! We will respond shortly.</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 text-white font-heading font-black tracking-widest text-xs uppercase flex items-center justify-center gap-2 shadow-lg shadow-red-950 cursor-pointer"
            >
              <Send className="w-4 h-4" /> DISPATCH INQUIRY TO COACHING DESK
            </button>
          </form>
        )}

        {/* TAB 3: GEAR STORE */}
        {activeTab === 'gear' && (
          <div className="space-y-3 animate-in fade-in duration-150">
            <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-600/30 flex items-center justify-between text-xs text-amber-300">
              <span>Partnered with Wellcore for clinical micronized creatine & pure isolate protein.</span>
              <a href="https://wellcore.in" target="_blank" rel="noopener noreferrer" className="underline font-bold flex items-center gap-1 shrink-0">
                Official Store <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {gearItems.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-bold text-white block">{item.name}</span>
                  <span className="text-[10px] font-mono text-zinc-500">{item.type}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-white font-bold">{item.price}</span>
                  <button
                    onClick={() => alert(`Direct checkout for ${item.name} initiated.`)}
                    className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-red-600 text-[10px] font-mono uppercase text-white transition-colors cursor-pointer"
                  >
                    Select
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: ABOUT VINAY VAISHNAV G */}
        {activeTab === 'about' && (
          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3 text-xs leading-relaxed text-zinc-300 animate-in fade-in duration-150">
            <h4 className="font-heading text-xl font-bold text-white">
              Vinay Vaishnav G — Platform Visionary & Lead Coach
            </h4>
            <p>
              IronVault Pro was engineered to provide athletes with uncompromising, science-backed bodybuilding architecture. Combining classical bodybuilding wisdom from Arnold and Dorian Yates with contemporary computer vision technology.
            </p>
            <p>
              "Consistency in mechanical tension, progressive overload, and disciplined nutritional fueling will overcome every genetic barrier."
            </p>
            <div className="pt-2 text-[11px] font-mono text-red-400">
              • Specialized in Drug-Free Hypertrophy & Periodization
              <br />
              • Certified Biomechanical Performance Engineering
            </div>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-zinc-800 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-400 hover:text-white"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
