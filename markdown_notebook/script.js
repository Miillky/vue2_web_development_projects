// New VueJS instance
new Vue({

  // CSS selector of the root DOM element
  el: '#notebook',

  // Some data
  data () {
    return {
      notes: JSON.parse(localStorage.getItem('notes')) || [],
      selectedId: null
    }
  },

  // Methods
  methods: {
    reportOperation (opName){
      console.log('The', opName, 'operattion was completed!');
    },
    addNote () {
      const time = Date.now()
      const note = {
        id: String(time),
        title: 'New note ' + (this.notes.length +1 ),
        content: '**Hi!** This notebook is using [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) for formating!',
        created: time,
        favorite: false,
      }
      this.notes.push(note)
    },
    selectNote (note) {
      this.selectedId = note.id
    },
    saveNotes () {
      localStorage.setItem('notes', JSON.stringify(this.notes))
      console.log('Notes saved!', new Date())
    }
  },

  // Computed properties
  computed: {
    notePreview () {
      // Markdown rendered to HTML
      return this.selectedNote ? marked(this.selectedNote.content) : ''
    },
    addButtonTitle () {
      return this.notes.length + ' note(s) alredy'
    },
    selectedNote () {
      return this.notes.find(note => note.id === this.selectedId)
    }
  },

  // Change watchers
  watch: {
    notes: {
      handler: 'saveNotes',
      deep: true,
    }
  },

  // This will be called when the instance is ready
  created () {
  }
})
