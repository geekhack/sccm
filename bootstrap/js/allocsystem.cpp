class ArenaAPR : public ImplAPR, public Arena::Impl {
public:
	ArenaAPR() : ImplAPR() {}
	virtual ~ArenaAPR() {}

	virtual void * alloc(size_t size) { return apr_palloc(mPool, (apr_size_t)size); }
	//not necessary; apr_pcalloc is only a macro anyway
	//virtual void * calloc(size_t size) { return apr_pcalloc(mPool, (apr_size_t)size); }
};

Arena :: Arena() {
	impl = new ArenaAPR();
}

Arena :: ~Arena() {
	delete impl;
}

} // al::