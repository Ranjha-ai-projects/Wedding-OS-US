import { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CheckCircle, Send, QrCode, RotateCcw } from 'lucide-react';
import { AppShell } from './AppShell';
import { weddingConfig } from '../../config/weddingConfig';
import { useOS } from '../../context/OSContext';

export const RSVPApp: React.FC = () => {
  const { rsvpData, updateRSVP, resetRSVP } = useOS();

  // Progressive steps: 0: Attendance, 1: Plus One, 2: Dietary, 3: Song, 4: Confirmed Pass
  const [step, setStep] = useState<number>(() => {
    if (rsvpData.completed) return 4;
    if (rsvpData.attending === false) return 0;
    if (rsvpData.attending === true) {
      if (rsvpData.dietary) return 3;
      return 1;
    }
    return 0;
  });

  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [songInput, setSongInput] = useState(rsvpData.songRequest || '');

  // Champagne gold + sage confetti burst
  const triggerChampagneConfetti = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#B89253', '#8A947A', '#F2EADF', '#6F775F', '#D4AF37'],
        ticks: 200,
        gravity: 1.1,
        scalar: 0.9,
      });
    } catch (e) {
      console.warn('Confetti error', e);
    }
  };

  const handleAttendance = (attending: boolean) => {
    if (!attending) {
      updateRSVP({ attending: false, completed: true });
      return;
    }

    updateRSVP({ attending: true });
    setIsTyping(true);
    triggerChampagneConfetti();

    setTimeout(() => {
      setIsTyping(false);
      setStep(1);
    }, 700);
  };

  const handlePlusOne = (hasPlusOne: boolean) => {
    updateRSVP({ plusOne: hasPlusOne });
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setStep(2);
    }, 600);
  };

  const handleDietary = (dietary: string) => {
    updateRSVP({ dietary });
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setStep(3);
    }, 600);
  };

  const handleFinishSong = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    updateRSVP({ songRequest: songInput, completed: true });
    triggerChampagneConfetti();
    setStep(4);
  };

  const handleReset = () => {
    resetRSVP();
    setStep(0);
    setSongInput('');
  };

  const coupleSubtitle = `${weddingConfig.couple.brideName} & ${weddingConfig.couple.groomName}`;

  return (
    <AppShell title="RSVP" subtitle={coupleSubtitle}>
      <div style={{ padding: '0.8rem 1.25rem 4rem 1.25rem' }}>
        {/* If Completed -> Show the Luxury Wedding Pass */}
        {rsvpData.completed && rsvpData.attending ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Success Heading */}
            <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  background: 'rgba(138, 148, 122, 0.18)',
                  border: '1px solid var(--sage)',
                  color: 'var(--olive)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '6px',
                }}
              >
                <CheckCircle size={13} color="var(--sage)" />
                <span>RSVP Confirmed</span>
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.85rem',
                  color: 'var(--text-primary)',
                  margin: '0 0 2px 0',
                }}
              >
                YOU’RE IN!
              </h2>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                We can’t wait to celebrate with you, Sarah.
              </p>
            </div>

            {/* Luxury Wedding Pass Ticket */}
            <div
              style={{
                width: '100%',
                maxWidth: '360px',
                borderRadius: '24px',
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                padding: '1.75rem 1.5rem',
                boxShadow: 'var(--shadow-card)',
                border: '1px solid var(--border-gold)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Top Pass Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <span
                  style={{
                    fontSize: '0.7rem',
                    letterSpacing: '0.22em',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: 'var(--gold)',
                  }}
                >
                  WEDDING PASS
                </span>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  {weddingConfig.guest.invitationCode}
                </span>
              </div>

              {/* Couple Names */}
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.8rem',
                  fontWeight: 400,
                  margin: '0 0 0.5rem 0',
                  lineHeight: 1.05,
                  color: 'var(--text-primary)',
                }}
              >
                {weddingConfig.couple.brideName} &amp; {weddingConfig.couple.groomName}
              </h3>

              <div style={{ height: '1px', background: 'rgba(184, 146, 83, 0.25)', margin: '1rem 0' }} />

              {/* Guest Details Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '1.25rem' }}>
                <div>
                  <span style={{ display: 'block', fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Guest
                  </span>
                  <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {weddingConfig.guest.name} {rsvpData.plusOne ? '+ 1' : ''}
                  </span>
                </div>

                <div>
                  <span style={{ display: 'block', fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Seating
                  </span>
                  <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--gold)' }}>
                    {weddingConfig.guest.assignedTable}
                  </span>
                </div>

                <div>
                  <span style={{ display: 'block', fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Date
                  </span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    25 OCT 2026
                  </span>
                </div>

                <div>
                  <span style={{ display: 'block', fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Location
                  </span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    The Glasshouse, NY
                  </span>
                </div>
              </div>

              {/* Preferences Summary */}
              {(rsvpData.dietary || rsvpData.songRequest) && (
                <div
                  style={{
                    padding: '8px 12px',
                    borderRadius: '12px',
                    background: 'rgba(248, 243, 234, 0.9)',
                    border: '1px solid rgba(184, 146, 83, 0.25)',
                    fontSize: '0.75rem',
                    color: 'var(--text-primary)',
                    marginBottom: '1.25rem',
                  }}
                >
                  {rsvpData.dietary && (
                    <p style={{ margin: '0 0 2px 0' }}>
                      <strong style={{ color: 'var(--gold)' }}>Diet:</strong> {rsvpData.dietary}
                    </p>
                  )}
                  {rsvpData.songRequest && (
                    <p style={{ margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      <strong style={{ color: 'var(--gold)' }}>Song:</strong> “{rsvpData.songRequest}”
                    </p>
                  )}
                </div>
              )}

              {/* Perforated ticket edge illusion */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  margin: '1.25rem 0',
                }}
              >
                <div style={{ height: '1px', flex: 1, borderTop: '2px dashed rgba(184, 146, 83, 0.35)' }} />
                <span style={{ fontSize: '0.68rem', color: 'var(--gold)', letterSpacing: '0.12em', fontWeight: 600 }}>SCAN AT ARRIVAL</span>
                <div style={{ height: '1px', flex: 1, borderTop: '2px dashed rgba(184, 146, 83, 0.35)' }} />
              </div>

              {/* QR Code Graphic */}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '14px' }}>
                <div
                  style={{
                    padding: '8px',
                    borderRadius: '12px',
                    background: '#F8F3EA',
                    border: '1px solid var(--border-gold)',
                    boxShadow: 'var(--shadow-soft)',
                  }}
                >
                  <QrCode size={64} color="#1E1A17" />
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  <p style={{ margin: '0 0 2px 0', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Couple OS Verified
                  </p>
                  <p style={{ margin: 0 }}>
                    Admit Sarah {rsvpData.plusOne ? '+ Guest' : ''}
                  </p>
                </div>
              </div>
            </div>

            {/* Reset / Edit Button */}
            <button
              type="button"
              onClick={handleReset}
              style={{
                marginTop: '1.25rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.04em',
                padding: '6px 12px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <RotateCcw size={13} color="var(--gold)" />
              <span>Modify RSVP Answers</span>
            </button>
          </motion.div>
        ) : rsvpData.attending === false ? (
          /* Declined Screen */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: 'center',
              padding: '2.5rem 1.5rem',
              borderRadius: '24px',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-gold)',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.5rem',
                color: 'var(--text-primary)',
                margin: '0 0 0.5rem 0',
              }}
            >
              We’ll Miss You, Sarah!
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.5rem' }}>
              We understand you can’t make it to New York. Thank you so much for celebrating our love from afar.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="btn-luxury"
              style={{
                fontSize: '0.8rem',
                padding: '0.7rem 1.25rem',
                backgroundColor: 'var(--text-primary)',
                color: 'var(--bg-primary)',
              }}
            >
              Change Response
            </button>
          </motion.div>
        ) : (
          /* Conversational Progressive RSVP Flow */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Step 0: Attendance */}
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: '#E7DEC8',
                  border: '1px solid var(--border-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--gold)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                J
              </div>

              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--gold)', fontWeight: 600 }}>
                  Joshua
                </span>
                <div
                  style={{
                    marginTop: '4px',
                    padding: '12px 16px',
                    borderRadius: '18px 18px 18px 4px',
                    background: 'var(--surface-cream)',
                    border: '1px solid var(--border-gold)',
                    boxShadow: 'var(--shadow-soft)',
                    fontSize: '0.92rem',
                    color: 'var(--text-primary)',
                    lineHeight: 1.4,
                  }}
                >
                  Hey {weddingConfig.guest.name} — are you coming to celebrate with us on {weddingConfig.couple.displayDate} in {weddingConfig.couple.locationCity}? 🎉
                </div>
              </div>
            </div>

            {/* Attendance Options */}
            {step === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  display: 'flex',
                  gap: '10px',
                  marginLeft: '46px',
                }}
              >
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => handleAttendance(true)}
                  className="btn-luxury"
                  style={{
                    flex: 1,
                    padding: '0.8rem 1rem',
                    fontSize: '0.84rem',
                    backgroundColor: 'var(--sage)',
                    color: 'var(--bg-primary)',
                    boxShadow: 'var(--shadow-soft)',
                  }}
                >
                  Absolutely 🎉
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => handleAttendance(false)}
                  className="btn-luxury"
                  style={{
                    flex: 1,
                    padding: '0.8rem 1rem',
                    fontSize: '0.84rem',
                    backgroundColor: 'transparent',
                    border: '1px solid var(--border-gold)',
                    color: 'var(--text-primary)',
                  }}
                >
                  Sadly can’t
                </motion.button>
              </motion.div>
            )}

            {/* Emily enthusiastic celebration reply */}
            {step >= 1 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'var(--sage)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#F8F3EA',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {weddingConfig.couple.brideName.charAt(0)}
                </div>

                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--gold)', fontWeight: 600 }}>
                    {weddingConfig.couple.brideName}
                  </span>
                  <div
                    style={{
                      marginTop: '4px',
                      padding: '12px 16px',
                      borderRadius: '18px 18px 18px 4px',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-gold)',
                      boxShadow: 'var(--shadow-soft)',
                      fontSize: '0.92rem',
                      color: 'var(--text-primary)',
                      lineHeight: 1.4,
                    }}
                  >
                    YESSS ❤️ Can’t wait to see you! Will you be bringing someone with you?
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 1: Plus One Options */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  display: 'flex',
                  gap: '10px',
                  marginLeft: '46px',
                }}
              >
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => handlePlusOne(false)}
                  className="btn-luxury"
                  style={{
                    flex: 1,
                    padding: '0.8rem 1rem',
                    fontSize: '0.84rem',
                    backgroundColor: 'transparent',
                    border: '1px solid var(--border-gold)',
                    color: 'var(--text-primary)',
                  }}
                >
                  Just me
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => handlePlusOne(true)}
                  className="btn-luxury"
                  style={{
                    flex: 1,
                    padding: '0.8rem 1rem',
                    fontSize: '0.84rem',
                    backgroundColor: 'var(--sage)',
                    color: 'var(--bg-primary)',
                    boxShadow: 'var(--shadow-soft)',
                  }}
                >
                  Me + 1
                </motion.button>
              </motion.div>
            )}

            {/* Step 2: Dietary Question */}
            {step >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: '#E7DEC8',
                    border: '1px solid var(--border-gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--gold)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  J
                </div>

                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--gold)', fontWeight: 600 }}>
                    Joshua
                  </span>
                  <div
                    style={{
                      marginTop: '4px',
                      padding: '12px 16px',
                      borderRadius: '18px 18px 18px 4px',
                      background: 'var(--surface-cream)',
                      border: '1px solid var(--border-gold)',
                      boxShadow: 'var(--shadow-soft)',
                      fontSize: '0.92rem',
                      color: 'var(--text-primary)',
                      lineHeight: 1.4,
                    }}
                  >
                    Any dietary requirements for the four-course dinner?
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '8px',
                  marginLeft: '46px',
                }}
              >
                {['No restrictions', 'Vegetarian', 'Vegan', 'Gluten Free'].map((opt) => (
                  <motion.button
                    key={opt}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => handleDietary(opt)}
                    className="btn-luxury"
                    style={{
                      padding: '0.65rem 0.8rem',
                      fontSize: '0.78rem',
                      borderRadius: '14px',
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--border-gold)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {opt}
                  </motion.button>
                ))}
              </motion.div>
            )}

            {/* Step 3: Song Request */}
            {step >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'var(--sage)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#F8F3EA',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {weddingConfig.couple.brideName.charAt(0)}
                </div>

                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--gold)', fontWeight: 600 }}>
                    {weddingConfig.couple.brideName}
                  </span>
                  <div
                    style={{
                      marginTop: '4px',
                      padding: '12px 16px',
                      borderRadius: '18px 18px 18px 4px',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-gold)',
                      boxShadow: 'var(--shadow-soft)',
                      fontSize: '0.92rem',
                      color: 'var(--text-primary)',
                      lineHeight: 1.4,
                    }}
                  >
                    Last question! What song will guarantee to get you out on the dance floor with us? 🪩
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.form
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleFinishSong}
                style={{
                  display: 'flex',
                  gap: '8px',
                  marginLeft: '46px',
                }}
              >
                <input
                  type="text"
                  value={songInput}
                  onChange={(e) => setSongInput(e.target.value)}
                  placeholder="e.g. ABBA - Dancing Queen"
                  style={{
                    flex: 1,
                    padding: '0.75rem 1rem',
                    borderRadius: '16px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-gold)',
                    color: 'var(--text-primary)',
                    fontSize: '0.85rem',
                    outline: 'none',
                  }}
                />
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="btn-luxury"
                  style={{
                    padding: '0.75rem 1.25rem',
                    borderRadius: '16px',
                    backgroundColor: 'var(--text-primary)',
                    color: 'var(--bg-primary)',
                  }}
                >
                  <Send size={15} color="var(--bg-primary)" />
                </motion.button>
              </motion.form>
            )}

            {/* Subtle Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '8px 14px',
                  borderRadius: '16px',
                  background: 'var(--surface-cream)',
                  border: '1px solid var(--border-gold)',
                  boxShadow: 'var(--shadow-soft)',
                  marginLeft: '46px',
                  width: 'fit-content',
                }}
              >
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold)', animation: 'softPulse 1s infinite' }} />
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold)', animation: 'softPulse 1s infinite 0.2s' }} />
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold)', animation: 'softPulse 1s infinite 0.4s' }} />
              </motion.div>
            )}
          </div>
        )}
      </div>
    </AppShell>
  );
};
