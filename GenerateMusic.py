import magenta
import note_seq
import tensorflow
from magenta.models.melody_rnn import melody_rnn_sequence_generator
from magenta.models.shared import sequence_generator_bundle
from note_seq.protobuf import generator_pb2
from note_seq.protobuf import music_pb2

# Magenta. Generate music, Continue a sequence. Consulted on 05/02/2021

# https://magenta.tensorflow.org/get-started/ 
# https://colab.research.google.com/notebooks/magenta/hello_magenta/hello_magenta.ipynb#scrollTo=oLSgiA6Uktpm
# https://github.com/magenta/magenta/blob/master/README.md

# Create empty note sequence.
song = music_pb2.NoteSequence()

# Add notes to the empty sequence.
song.notes.add(pitch=60, start_time=0.0, end_time=0.5, velocity=80)
song.notes.add(pitch=60, start_time=0.5, end_time=1.0, velocity=80)
song.notes.add(pitch=67, start_time=1.0, end_time=1.5, velocity=80)
song.notes.add(pitch=67, start_time=1.5, end_time=2.0, velocity=80)
song.notes.add(pitch=69, start_time=2.0, end_time=2.5, velocity=80)
song.notes.add(pitch=69, start_time=2.5, end_time=3.0, velocity=80)
song.notes.add(pitch=67, start_time=3.0, end_time=4.0, velocity=80)

# Set the total time of the track.
song.total_time = 4

# Visualize & Play the sequence.
note_seq.plot_sequence(song)
note_seq.play_sequence(song,synth = note_seq.fluidsynth)

# Create the model.
bundle = sequence_generator_bundle.read_bundle_file('./model.mag')
generator_map = melody_rnn_sequence_generator.get_generator_map()
melody_rnn = generator_map['model'](checkpoint = None, bundle = bundle)
melody_rnn.initialize()

# Model options. Generating sequences
input_sequence = song
num_steps = 128 
temperature = 1.0

# Set the start time to begin generating the sequence.
last_end_time = (max(n.end_time for n in input_sequence.notes)
                  if input_sequence.notes else 0)
qpm = input_sequence.tempos[0].qpm 
seconds_per_step = 60.0 / qpm / melody_rnn.steps_per_quarter
total_seconds = num_steps * seconds_per_step

generator_options = generator_pb2.GeneratorOptions()
generator_options.args['temperature'].float_value = temperature
generate_section = generator_options.generate_sections.add(
  start_time=last_end_time + seconds_per_step,
  end_time=total_seconds)

# Continue the sequence using the model.
sequence = melody_rnn.generate(input_sequence, generator_options)

# Play the sequence.
note_seq.plot_sequence(sequence)
note_seq.play_sequence(sequence, synth=note_seq.fluidsynth)