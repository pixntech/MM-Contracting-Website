import { motion } from 'framer-motion'

interface CheckpointNodeProps {
  active: boolean
  index: number
}

export function CheckpointNode({ active, index }: CheckpointNodeProps) {
  return (
    <div className="relative flex items-center justify-center">
      {/* Ripple */}
      {active && (
        <motion.span
          initial={{ scale: 0.6, opacity: 0.5 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{
            duration: 1.2,
            ease: 'easeOut',
            delay: index * 0.12,
            repeat: 0,
          }}
          className="absolute inset-0 rounded-full border-2 border-primary"
        />
      )}

      {/* Outer ring */}
      <motion.div
        initial={false}
        animate={
          active
            ? {
                scale: 1,
                borderColor: 'rgba(65,157,240,0.5)',
                boxShadow: '0 0 20px rgba(65,157,240,0.25)',
              }
            : {
                scale: 0.85,
                borderColor: 'rgba(148,163,184,0.3)',
                boxShadow: '0 0 0px rgba(65,157,240,0)',
              }
        }
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-7 h-7 rounded-full border-2 flex items-center justify-center bg-white"
      >
        {/* Inner circle */}
        <motion.div
          initial={false}
          animate={
            active
              ? {
                  scale: 1,
                  backgroundColor: '#419DF0',
                  boxShadow: '0 0 12px rgba(65,157,240,0.5)',
                }
              : {
                  scale: 0.6,
                  backgroundColor: '#CBD5E1',
                  boxShadow: '0 0 0px rgba(65,157,240,0)',
                }
          }
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-3 h-3 rounded-full"
        />
      </motion.div>

      {/* Pulse dot */}
      {active && (
        <motion.span
          animate={{ scale: [1, 1.15, 1] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute w-1.5 h-1.5 rounded-full bg-primary"
          style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        />
      )}
    </div>
  )
}
