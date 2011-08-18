/*globals BP d3*/

BP = {};

BP.TabManager = {
  initTabs: function() {
    var tabContainers = $('div.tabs > div');
    $('div.tabs ul.tabNavigation a').click(function () {
        tabContainers.hide().filter(this.hash).show();

        $('div.tabs ul.tabNavigation a').removeClass('selected');
        $(this).addClass('selected');

        return false;
    }).filter(':first').click();
  }
};

BP.QuizManager = {
  currentQuestion: 0,
  
  showHint: function(){
    var i = this.currentQuestion;
    $("#question"+i).children('.hint').show();
  },
  
  checkAnswer: function(classList){
    if (classList.contains("correct")) {
      alert("Correct");
      this.showNextQuestion();
      
    }else if (classList.contains("incorrect")){
      alert("Incorrect");
      this.showHint();
    }
  },
  
  showNextQuestion: function(){
    $('.question').hide();
    this.currentQuestion++;
    $('#question'+this.currentQuestion).show();
  },
  
  showPreviousQuestion: function(){
    $('.question').hide();
    this.currentQuestion--;
    $('#question'+this.currentQuestion).show();
  },
  
  initQuiz: function() {
    $('.question').hide(); // Hide all questions
    $('.hint').hide(); // Hide all hints
    $('#question0').show(); // Show first question

    $('#next-question').click(function() {
      BP.QuizManager.showNextQuestion();
    });    
    $('#previous-question').click(function() {
      BP.QuizManager.showPreviousQuestion();
    });    

    $('#start-over').click(function() {
      // Make this work.
    });
    $(".answer").click(function() {
      var classList = this.classList;
      BP.QuizManager.checkAnswer(classList);  
    });
  }
};

BP.ZoomPanManager = {
  initZoomPan: function() {
    var svg;
    function redraw() {
      svg.selectAll("g")
        .attr("transform","translate(" + d3.event.translate + ")" + "scale(" + d3.event.scale + ")");    
    }    
    svg = d3.select("#b")
      .call(d3.behavior.zoom().on("zoom", redraw));    
  }
};

BP.HighlightManager = {
    
  highlight: function(id){
    switch (id) {
      case "axillary": 
        $("#green").attr('fill', "yellow").attr('stroke', 'red');
        break;
      case "C5": 
        $("#blue").attr('fill', "yellow").attr('stroke', 'red');
        break;
      case "musculocutaneous": 
        $("#black").attr('stroke', "red");
        break;

      default: 
        console.log("default");
        break;
    }
  },
  
  unhighlight: function(id){
    switch (id) {
      case "axillary": 
        $("#green").attr('fill', "#76B74A").attr('stroke', '#000');
        break;
      case "C5": 
        $("#blue").attr("fill", "#4E94A0").attr('stroke', "#000");
        break;
      case "musculocutaneous": 
        $("#black").attr('stroke', "#000");
        break;
        
      default: 
        console.log("default");
        break;
    }
  },
  
  initHighlighting: function(){
    var highlight   = this.highlight,
        unhighlight = this.unhighlight;
    $("#schematic div").mouseenter(function() {
      var id = this.id;
      highlight(id);
    }).mouseleave(function() {
      var id = this.id;
      unhighlight(id);
    });
  }
};

$(function () {
  BP.TabManager.initTabs();  
  BP.QuizManager.initQuiz();
  BP.ZoomPanManager.initZoomPan();
  BP.HighlightManager.initHighlighting();
});

