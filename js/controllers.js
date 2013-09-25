var SatoshiDice = angular.module('SatoshiDice', []);
SatoshiDice.directive( [ 'focus', 'blur', 'keyup', 'keydown', 'keypress', 'scroll' ].reduce( function ( container, name ) {
    var directiveName = 'ng' + name[ 0 ].toUpperCase( ) + name.substr( 1 );
    container[ directiveName ] = [ '$parse', function ( $parse ) {
        return function ( scope, element, attr ) {
            var fn = $parse( attr[ directiveName ] );
            element.bind( name, function ( event ) {
                scope.$apply( function ( ) {
                    fn( scope, {
                        $event : event
                    } );
                } );
            } );
        };
    } ];
    return container;
}, { } ) );

function ScreenCtrl($scope) {
  $scope.screens = [];
  $scope.getScreenClass = function(screen) {
    if ( !$scope.screens || $scope.screens.lenght ) return 'right';
    if ( $scope.screens[$scope.screens.length-1] == screen )
      return 'center';
    if ( $scope.screens.indexOf(screen) >= 0 )
      return 'left';
    return 'right';
  }
  $scope.pushView = function(screen) {
    $scope.screens.push(screen);
  }
  $scope.popView = function() {
    $scope.screens.pop();
  }
  $scope.$on('pushView', function(e, view){
    $scope.pushView(view);
  });
}

function BetListCtrl($scope) {
  $scope.bets = [{betAmount: ''}, {betAmount: ''}, {betAmount: ''}, {betAmount: ''}, {betAmount: ''}, {betAmount: ''}, {betAmount: ''}, {betAmount: ''}, {betAmount: ''}, {betAmount: ''}, {betAmount: ''}, {betAmount: ''}, {betAmount: ''}, {betAmount: ''}, {betAmount: ''}, {betAmount: ''}, {betAmount: ''}, {betAmount: ''}, {betAmount: ''}, {betAmount: ''}, {betAmount: ''}, {betAmount: ''}, {betAmount: ''}, {betAmount: ''}, {betAmount: ''}, {betAmount: ''}, {betAmount: ''}];
  $scope.totalBets = 0;
  $scope.updateBet = function(bet) {
    bet.betAmount = parseFloat(bet.betAmount);
    if( !bet.betAmount )  bet.betAmount = '';
    $scope.updateTotals();
  }
  $scope.updateTotals = function() {
    var total = 0;
    $scope.bets.forEach(function(bet){
      if ( bet.betAmount && parseFloat(bet.betAmount) && bet.betAmount != '' )
        total += parseFloat(bet.betAmount);
    });
    total = parseFloat(total.toFixed(5));
    $scope.totalBets = total;
  }
  $scope.resetBets = function(){
    $scope.bets.forEach(function(bet){
      bet.betAmount = '';
    });
    $scope.updateTotals();
  }
  $scope.placeBet = function() {
    if ( !$scope.totalBets )  return;
    window.hive.send('hash', $scope.totalBets, function(success) { 
      if (success) { 
        $scope.resetBets();
        $scope.$emit('pushView', 'dice-stats');
        $scope.$apply();
      } else { 
        //alert('Send failed'); 
      }
    });
  }
}

function StatsCtrl($scope) {
  
}