Vue.filter("date", time => moment(time).format("DD/MM/YY, HH:mm"));

// New VueJS instance
new Vue({
  // CSS selector of the root DOM element
  el: "#notebook",

  // Some data
  data() {
    return {
      notes: JSON.parse(localStorage.getItem("notes")) || [],
      selectedId: null
    };
  },

  // Methods
  methods: {
    reportOperation(opName) {
      console.log("The", opName, "operattion was completed!");
    },
    addNote() {
      const time = Date.now();
      const note = {
        id: String(time),
        title: "New note " + (this.notes.length + 1),
        content:
          "**Hi!** This notebook is using [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) for formating!",
        created: time,
        favorite: false
      };
      this.notes.push(note);
    },
    selectNote(note) {
      this.selectedId = note.id;
    },
    saveNotes() {
      localStorage.setItem("notes", JSON.stringify(this.notes));
      console.log("Notes saved!", new Date());
    },
    removeNote() {
      if (this.selectedNote && confirm("Delete the note")) {
        const index = this.notes.indexOf(this.selectedNote);
        if (index !== -1) {
          this.notes.splice(index, 1);
        }
      }
    },
    favoriteNote() {
      //this.selectedNote.favorite = !this.selectedNote.favorite
      //this.selectedNote.favorite = this.selectNote.favorite ^ true
      this.selectedNote.favorite ^= true;
    }
  },

  // Computed properties
  computed: {
    notePreview() {
      // Markdown rendered to HTML
      return this.selectedNote ? marked(this.selectedNote.content) : "";
    },
    addButtonTitle() {
      return this.notes.length + " note(s) alredy";
    },
    selectedNote() {
      return this.notes.find(note => note.id === this.selectedId);
    },
    sortedNotes() {
      //notes.slice to create a copy of array to not trigger watchers
      return this.notes
        .slice()
        .sort((a, b) => a.create - b.created)
        .sort((a, b) => (a.favorite === b.favorite ? 0 : a.favorite ? -1 : 1));
    },
    linesCount() {
      if (this.selectedNote) {
        //Count the number of new line characters
        return this.selectedNote.content.split(/\r\n|\r|\n/).length;
      }
    },
    wordsCount() {
      if (this.selectedNote) {
        var s = this.selectedNote.content;
        //Turn new line characters into white space
        s = s.replace(/\n/g, " ");
        //Exclude start and end white-spaces
        s = s.replace(/(^\s*)|(\s*$)/gi, "");
        //Turn 2 or more duplicate white-spaces into 1
        s = s.replace(/\s\s+/gi, " ");
        //Return the number of spaces
        return s.split(" ").length;
      }
    },
    charactersCount() {
      if (this.selectedNote) {
        return this.selectedNote.content.split("").length;
      }
    }
  },

  // Change watchers
  watch: {
    notes: {
      handler: "saveNotes",
      deep: true
    }
  },

  // This will be called when the instance is ready
  created() {}
});
