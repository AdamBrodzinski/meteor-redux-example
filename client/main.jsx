Meteor.startup(function() {
  React.render(
    <div>
      <DebugPanel top right bottom>
        <DevTools store={store} monitor={LogMonitor} />
      </DebugPanel>
    </div>,
    document.getElementById('react-root'));
});
